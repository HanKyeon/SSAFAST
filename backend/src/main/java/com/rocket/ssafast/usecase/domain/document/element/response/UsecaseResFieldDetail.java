package com.rocket.ssafast.usecase.domain.document.element.response;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseResFieldDetail {
	@NotEmpty
	String type;

	String desc;

	@NotNull
	Boolean itera;
}
