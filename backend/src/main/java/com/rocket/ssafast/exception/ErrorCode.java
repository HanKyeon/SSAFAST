package com.rocket.ssafast.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	INVALID_COOKIE(HttpStatus.BAD_REQUEST, "INVALID COOKIE"),
	BAD_REQUEST(HttpStatus.BAD_REQUEST, "BAD REQUEST"),
	NOT_FOUND(HttpStatus.NOT_FOUND, "NOT FOUND"),
	UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED"),
	FORBIDDEN(HttpStatus.FORBIDDEN, "FORBIDDEN"),
	CONFLICT(HttpStatus.CONFLICT, "CONFLICT"),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR");

	private HttpStatus httpStatus;
	private String message;
}
