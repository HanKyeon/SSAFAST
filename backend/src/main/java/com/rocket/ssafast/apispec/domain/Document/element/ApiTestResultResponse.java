package com.rocket.ssafast.apispec.domain.Document.element;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ApiTestResultResponse {
	Map<String, String> headers;
	Object body;
	String statusCode;
	int statusCodeValue;

	@Builder
	public ApiTestResultResponse(Map<String, String> headers, Object body, String statusCode, int statusCodeValue) {
		this.headers = headers;
		this.body = body;
		this.statusCode = statusCode;
		this.statusCodeValue = statusCodeValue;
	}
}
