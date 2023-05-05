package com.rocket.ssafast.apispec.dto.request;

import java.util.Map;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.bson.json.JsonObject;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ExecReqMessageDto {

	@NotEmpty
	String url;

	@NotEmpty
	String method;

	@NotNull
	Map<String, String> headers;

	Map<String, String> pathVars;

	Map<String, String> params;

	String body;
}
