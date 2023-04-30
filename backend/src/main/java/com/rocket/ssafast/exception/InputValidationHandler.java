package com.rocket.ssafast.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class InputValidationHandler {

	// Dto 유효성 검증
	@ExceptionHandler(MethodArgumentNotValidException.class)
	protected ResponseEntity<?> handleDtoNotValid(MethodArgumentNotValidException e) {
		log.error("client error: ", e);
		return new ResponseEntity<>(ErrorCode.BAD_REQUEST.getMessage(), ErrorCode.BAD_REQUEST.getHttpStatus());
	}

	@ExceptionHandler(MissingRequestCookieException.class)
	protected ResponseEntity<?> handleCookieNotValid(MissingRequestCookieException e) {
		log.error("client error: ", e);
		return new ResponseEntity<>(ErrorCode.INVALID_COOKIE.getMessage(), ErrorCode.INVALID_COOKIE.getHttpStatus());
	}
}
