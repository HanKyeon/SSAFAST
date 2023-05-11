package com.rocket.ssafast.usecase.domain.document.element.response;

import java.util.Map;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestResNestedDto {

	@NotEmpty
	String dtoName;

	Map<String, UsecaseTestResFieldDetail> fields;

}
