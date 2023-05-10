package com.rocket.ssafast.apispec.dto.request;

import java.util.Map;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.apispec.domain.Document.element.ApiTestResultRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ApiExecReqMessageDto {

	@NotEmpty
	String url;

	@NotNull
	Integer method;

	Map<String, String> headers;

	Map<String, String> pathVars;
	
	Map<String, String> params;

	String body;

	public ApiTestResultRequest toApiTestResultRequest() {
		return ApiTestResultRequest.builder()
			.url(url)
			.method(method)
			.headers(headers)
			.pathVars(pathVars)
			.params(params)
			.body(body)
			.build();
	}
}
