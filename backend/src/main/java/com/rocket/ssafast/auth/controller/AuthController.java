package com.rocket.ssafast.auth.controller;

import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.auth.dto.request.LoginReqUserDto;
import com.rocket.ssafast.auth.dto.response.TokenDto;
import com.rocket.ssafast.auth.service.AuthService;
import com.rocket.ssafast.auth.service.RedisService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final long COOKIE_EXPIRATION = 7776000; // 90일
	private final RedisService redisService;

	// 토큰 재발급
	@PostMapping("/reissue")
	public ResponseEntity<?> reissue(@CookieValue(name = "refresh-token") String requestRefreshToken,
		@RequestHeader("Authorization") String requestAccessToken) {
		log.info("---------------재발급--------------------");
		log.info("prev redis all data: "+ redisService.getAllKeysAndValues());
		TokenDto reissuedTokenDto = authService.reissue(requestAccessToken, requestRefreshToken);
		log.info("after redis all data: "+ redisService.getAllKeysAndValues());

		if (reissuedTokenDto != null) { // 토큰 재발급 성공
			// RT 저장
			ResponseCookie responseCookie = ResponseCookie.from("refresh-token", reissuedTokenDto.getRefreshToken())
				.maxAge(COOKIE_EXPIRATION)
				.httpOnly(true)
				.secure(true)
				.build();
			return ResponseEntity
				.status(HttpStatus.OK)
				.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
				// AT 저장
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + reissuedTokenDto.getAccessToken())
				.build();

		} else { // Refresh Token 탈취 가능성
			// Cookie 삭제 후 재로그인 유도
			ResponseCookie responseCookie = ResponseCookie.from("refresh-token", "")
				.maxAge(0)
				.path("/")
				.build();
			return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
				.build();
		}
	}

	// 로그아웃
	@PostMapping("/logout")
	public ResponseEntity<?> logout(@RequestHeader("Authorization") String requestAccessToken) {
		log.info("---------------로그아웃--------------------");
		log.info("prev redis all data: "+ redisService.getAllKeysAndValues());
		authService.logout(requestAccessToken);
		log.info("after redis all data: "+ redisService.getAllKeysAndValues());
		ResponseCookie responseCookie = ResponseCookie.from("refresh-token", "")
			.maxAge(0)
			.path("/")
			.build();

		return ResponseEntity
			.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
			.build();
	}

	@GetMapping("/test")
	public String test(){
		return "success";
	}
}
