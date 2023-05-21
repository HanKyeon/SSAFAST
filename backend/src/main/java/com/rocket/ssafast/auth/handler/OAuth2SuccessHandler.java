package com.rocket.ssafast.auth.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.rocket.ssafast.auth.dto.response.TokenDto;
import com.rocket.ssafast.auth.jwt.JwtTokenProvider;
import com.rocket.ssafast.auth.service.RedisService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

	private final RedisService redisService;
	private final JwtTokenProvider jwtTokenProvider;
	private long COOKIE_EXPIRATION = 7776000; // 90일

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		String email = oAuth2User.getAttribute("email");

		// generate token & save
		TokenDto tokenDto = jwtTokenProvider.createToken(email);
		redisService.setValuesWithTimeout(email, // key
			tokenDto.getRefreshToken(), // value
			jwtTokenProvider.getTokenExpirationTime(tokenDto.getRefreshToken())); // timeout(milliseconds)

		// RT
		HttpCookie httpCookie = ResponseCookie.from("refresh-token", tokenDto.getRefreshToken())
			.maxAge(COOKIE_EXPIRATION)
			.httpOnly(true)
			.secure(true)
			.path("/")
			.build();

		System.out.println(tokenDto.getAccessToken());
		response.addHeader(HttpHeaders.SET_COOKIE, httpCookie.toString());
		response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccessToken());
		response.setContentType("application/json;charset=UTF-8");

		StringBuilder url = new StringBuilder();

		if (request.getServerName().equals("localhost") && request.getServerPort() == 3000) {
			url.append("http://localhost:3000/google-loading");
		} else {
			url.append("https://www.ssafast.com/google-loading");
		}

		url.append("?refresh-token=")
			.append(tokenDto.getRefreshToken())
			.append("&access-token=")
			.append(tokenDto.getAccessToken());

		response.sendRedirect(url.toString());
	}
}
