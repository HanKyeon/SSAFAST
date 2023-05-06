package com.rocket.ssafast.apispec.dto.request;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.apispec.domain.Document.element.ApiTestResultResponse;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ApiTestResultResponseDto {
	@NotNull
	Map<String, List> headers;

	@NotNull
	Object body;

	@NotEmpty
	String statusCode;

	@NotNull
	Integer statusCodeValue;

	public ApiTestResultResponse toApiTestResultResponse() {
		return ApiTestResultResponse.builder()
			.headers(headers)
			.body(body)
			.statusCode(statusCode)
			.statusCodeValue(statusCodeValue)
			.build();
	}
}
