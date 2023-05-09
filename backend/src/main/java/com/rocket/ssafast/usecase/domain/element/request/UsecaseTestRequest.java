package com.rocket.ssafast.usecase.domain.element.request;

import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestRequest {

	@Valid
	@NotNull
	Map<String, UsecaseTestReqHeaderFieldDetail> headers;	// key : header의 필드

	@Valid
	Map<String, UsecaseTestReqFieldDetail> pathVars;	// key : pathVariable 이름

	@Valid
	Map<String, UsecaseTestReqFieldDetail> params;		// key : param 이름

	@Valid
	UsecaseTestReqBody body;
}
