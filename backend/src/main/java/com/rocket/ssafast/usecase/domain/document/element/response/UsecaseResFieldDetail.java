package com.rocket.ssafast.usecase.domain.document.element.response;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseResFieldDetail {
	
	int type;

	String desc;

	Boolean itera;
}
