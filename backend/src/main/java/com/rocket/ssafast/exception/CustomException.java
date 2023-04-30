package com.rocket.ssafast.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

	private HttpStatus httpStatus;
	private String message;

	public CustomException (ErrorCode errorCode) {
		this.httpStatus = errorCode.getHttpStatus();
		this.message = errorCode.getMessage();
	}
}

