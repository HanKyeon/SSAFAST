package com.rocket.ssafast.usecase.domain.document.element.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseReqPathFieldDetail {

	@NotNull
	Long type;

	String desc;

	@NotNull
	boolean mapped;

	List<String> constraints;

	Object value;
}
