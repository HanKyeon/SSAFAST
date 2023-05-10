package com.rocket.ssafast.usecase.domain.element.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestReqFieldDetail {

	@NotEmpty
	String type;

	String desc;

	@NotNull
	boolean itera;

	List<String> constraints;

	@NotNull
	boolean mapped;

	Object value;
}
