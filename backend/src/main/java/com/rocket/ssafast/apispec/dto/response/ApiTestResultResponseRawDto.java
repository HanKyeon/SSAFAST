package com.rocket.ssafast.apispec.dto.response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rocket.ssafast.apispec.dto.request.ApiTestResultResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiTestResultResponseRawDto {
	Map<String, List> headers;

	Object body;

	String statusCode;

	Integer statusCodeValue;

	public ApiTestResultResponseDto toResponseDto() {
		Map<String, String> dtoHeaders = new HashMap<>();

		headers.forEach((key, valueList) -> {
			dtoHeaders.put(key, String.join(", ", valueList));
		});

		return ApiTestResultResponseDto.builder()
			.headers(dtoHeaders)
			.body(body)
			.statusCode(statusCode)
			.statusCodeValue(statusCodeValue)
			.build();
	}
}
