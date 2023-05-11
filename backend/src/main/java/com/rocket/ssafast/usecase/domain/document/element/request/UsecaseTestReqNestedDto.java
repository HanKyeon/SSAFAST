package com.rocket.ssafast.usecase.domain.document.element.request;

import java.util.Map;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestReqNestedDto {

	@NotEmpty
	String dtoName;

	Map<String, UsecaseTestReqFieldDetail> fields;
}
