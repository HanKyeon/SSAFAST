package com.rocket.ssafast.apispec.domain.Document.element;

import java.util.Map;

import com.rocket.ssafast.apispec.dto.request.ApiExecReqMessageParamDto;

import lombok.Builder;

public class ApiTestResultRequest {
	String url;

	int method;

	Map<String, String> headers;

	Map<String, String> pathVars;

	Map<String, ApiExecReqMessageParamDto> params;

	String body;

	@Builder
	public ApiTestResultRequest(String url, int method, Map<String, String> headers, Map<String, String> pathVars, Map<String, ApiExecReqMessageParamDto> params, String body) {
		this.url = url;
		this.method = method;
		this.headers = headers;
		this.pathVars = pathVars;
		this.params = params;
		this.body = body;
	}
}
