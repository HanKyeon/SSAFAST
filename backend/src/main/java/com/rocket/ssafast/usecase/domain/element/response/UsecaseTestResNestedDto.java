package com.rocket.ssafast.usecase.domain.element.response;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestResNestedDto {

	@NotNull
	Boolean itera;

	Map<String, UsecaseTestResFieldDetail> fields;

	List<Map<String, UsecaseTestResFieldDetail>> fieldsList;
}
