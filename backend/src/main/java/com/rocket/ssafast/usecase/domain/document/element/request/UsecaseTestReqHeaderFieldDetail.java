package com.rocket.ssafast.usecase.domain.document.element.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestReqHeaderFieldDetail {
	@NotEmpty
	String type;

	@NotEmpty
	String desc;

	@NotNull
	boolean mapped;

	Object value;
}
