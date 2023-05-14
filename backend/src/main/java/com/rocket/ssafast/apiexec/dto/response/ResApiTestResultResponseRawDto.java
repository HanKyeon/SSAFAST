package com.rocket.ssafast.apiexec.dto.response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rocket.ssafast.apiexec.dto.request.ReqApiTestResultResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResApiTestResultResponseRawDto {
	Map<String, List> headers;

	Object body;

	String statusCode;

	Integer statusCodeValue;

	public ReqApiTestResultResponseDto toResponseDto() {
		Map<String, String> dtoHeaders = new HashMap<>();

		headers.forEach((key, valueList) -> {
			dtoHeaders.put(key, String.join(", ", valueList));
		});

		return ReqApiTestResultResponseDto.builder()
			.headers(dtoHeaders)
			.body(body)
			.statusCode(statusCode)
			.statusCodeValue(statusCodeValue)
			.build();
	}
}
