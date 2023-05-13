package com.rocket.ssafast.usecase.domain.document.element.request;

import java.util.Map;

import javax.validation.Valid;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestRequest {

	@Valid
	Map<String, UsecaseReqHeaderFieldDetail> headers;	// key : header의 필드

	@Valid
	Map<String, UsecaseReqPathFieldDetail> pathVars;	// key : pathVariable 이름

	@Valid
	Map<String, UsecaseReqFieldDetail> params;		// key : param 이름

	@Valid
	UsecaseReqBody body;
}
