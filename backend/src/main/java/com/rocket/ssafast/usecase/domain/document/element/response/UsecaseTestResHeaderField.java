package com.rocket.ssafast.usecase.domain.document.element.response;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestResHeaderField {
	@NotEmpty
	String type;
	String desc;
}
