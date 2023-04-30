package com.rocket.ssafast.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.user.dto.request.SignUpReqUserDto;
import com.rocket.ssafast.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final BCryptPasswordEncoder encoder;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignUpReqUserDto reqUserDto) {
		try {
			reqUserDto.setPassword(encoder.encode(reqUserDto.getPassword()));
			return new ResponseEntity<>(userService.createUser(reqUserDto), HttpStatus.OK);
		} catch (CustomException e) {
			log.error("error: ", e);
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode ec = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(ec.getMessage(), ec.getHttpStatus());
		}
	}
}
