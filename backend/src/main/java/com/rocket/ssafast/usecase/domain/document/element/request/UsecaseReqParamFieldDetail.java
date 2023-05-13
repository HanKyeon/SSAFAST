package com.rocket.ssafast.usecase.domain.document.element.request;

import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsecaseReqParamFieldDetail {
	@NotNull
	Long type;

	String desc;

	@NotNull
	boolean itera;

	List<String> constraints;

	@NotNull
	boolean mapped;

	String value;
}
