package com.rocket.ssafast.usecase.domain.document.element.request;

import java.util.Map;

import javax.validation.Valid;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestRequest {

	@Valid
	Map<String, UsecaseTestReqHeaderFieldDetail> headers;	// key : header의 필드

	@Valid
	Map<String, UsecaseTestReqPathFieldDetail> pathVars;	// key : pathVariable 이름

	@Valid
	Map<String, UsecaseTestReqFieldDetail> params;		// key : param 이름

	@Valid
	UsecaseTestReqBody body;
}
