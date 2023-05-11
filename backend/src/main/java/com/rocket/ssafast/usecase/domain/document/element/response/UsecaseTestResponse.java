package com.rocket.ssafast.usecase.domain.document.element.response;

import java.util.Map;

import javax.validation.Valid;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestResponse {

	@Valid
	Map<String, UsecaseTestResHeaderField> headers;

	@Valid
	UsecaseTestResBody body;
}
