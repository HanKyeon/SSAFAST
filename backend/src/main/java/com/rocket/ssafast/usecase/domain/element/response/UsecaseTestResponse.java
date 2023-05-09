package com.rocket.ssafast.usecase.domain.element.response;

import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestResponse {

	@Valid
	@NotNull
	Map<String, UsecaseTestResHeaderField> headers;

	@Valid
	@NotNull
	UsecaseTestResBody body;
}
