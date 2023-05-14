package com.rocket.ssafast.apiexec.dto.request;

import java.util.Map;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqApiTestResultResponseDto {
	@NotNull
	Map<String, String> headers;

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
