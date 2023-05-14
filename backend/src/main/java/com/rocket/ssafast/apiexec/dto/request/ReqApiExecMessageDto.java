package com.rocket.ssafast.apiexec.dto.request;

import java.util.Map;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.apiexec.dto.request.element.ReqApiExecMessageParamDto;

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
public class ReqApiExecMessageDto {

	@NotEmpty
	String url;

	@NotNull
	Integer method;

	Map<String, String> headers;

	Map<String, String> pathVars;
	
	Map<String, ReqApiExecMessageParamDto> params;

	String body;
}
