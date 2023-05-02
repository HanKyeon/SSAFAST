package com.rocket.ssafast.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "USER NOT FOUND"),
	WORKSPACE_NOT_FOUND(HttpStatus.BAD_REQUEST, "WORKSPACE NOT FOUND"),
	INVALID_COOKIE(HttpStatus.BAD_REQUEST, "INVALID COOKIE"),
	INVALID_MEMBER(HttpStatus.BAD_REQUEST, "INVALID_MEMBER"),
	BAD_REQUEST(HttpStatus.BAD_REQUEST, "BAD REQUEST"),
	UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED"),
	FORBIDDEN(HttpStatus.FORBIDDEN, "FORBIDDEN"),
	CONFLICT(HttpStatus.CONFLICT, "CONFLICT"),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR");

	private HttpStatus httpStatus;
	private String message;
}