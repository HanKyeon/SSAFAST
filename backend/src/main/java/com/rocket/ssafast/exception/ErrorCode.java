package com.rocket.ssafast.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "USER NOT FOUND"),
	FIGMA_TOKEN_NOT_FOUND(HttpStatus.BAD_REQUEST, "FIGMA TOKEN NOT FOUND"),
	WORKSPACE_NOT_FOUND(HttpStatus.BAD_REQUEST, "WORKSPACE NOT FOUND"),
	JAVATYPE_NOT_FOUND(HttpStatus.BAD_REQUEST, "JAVA TYPE NOT FOUND"),
	CONSTRAINT_NOT_FOUND(HttpStatus.BAD_REQUEST, "CONSTRAINT NOT FOUND"),
	HTTPMETHOD_NOT_FOUND(HttpStatus.BAD_REQUEST, "HTTP METHOD NOT FOUND"),
	INVALID_COOKIE(HttpStatus.BAD_REQUEST, "INVALID COOKIE"),
	INVALID_MEMBER(HttpStatus.BAD_REQUEST, "INVALID_MEMBER"),
	BAD_REQUEST(HttpStatus.BAD_REQUEST, "INVALID INPUT"),
	UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED"),
	FORBIDDEN(HttpStatus.FORBIDDEN, "FORBIDDEN"),
	CONFLICT(HttpStatus.CONFLICT, "CONFLICT"),
	DUPLICATE(HttpStatus.BAD_REQUEST, "DUPLICATE"),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR"),
	CATEGORY_NOT_FOUND(HttpStatus.BAD_REQUEST, "CATEGORY NOT FOUND"),
	DTO_DEPTH_OVER(HttpStatus.BAD_REQUEST, "DTO DEPTH OVER 2"),
	DTO_NOT_FOUND(HttpStatus.BAD_REQUEST, "DTO NOT FOUND"),
	API_NOT_FOUND(HttpStatus.BAD_REQUEST, "API NOT FOUND"),
	SECTION_NOT_FOUND(HttpStatus.BAD_REQUEST, "SECTION NOT FOUND"),
	DETAIL_RESULT_NOT_FOUND(HttpStatus.BAD_REQUEST, "DETAIL RESULT NOT FOUND"),
	USECASETEST_NOT_FOUND(HttpStatus.BAD_REQUEST, "USECASE TEST NOT FOUND");

	private HttpStatus httpStatus;
	private String message;
}
