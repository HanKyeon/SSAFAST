package com.rocket.ssafast.usecase.domain.document.element.response;

import java.util.Map;

import javax.validation.Valid;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseResponse {

	@Valid
	Map<String, UsecaseResHeaderField> headers;

	@Valid
	UsecaseResBody body;
}
