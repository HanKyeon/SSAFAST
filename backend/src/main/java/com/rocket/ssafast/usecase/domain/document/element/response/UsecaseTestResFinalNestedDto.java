package com.rocket.ssafast.usecase.domain.document.element.response;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestResFinalNestedDto {

	@NotNull
	Boolean itera;

	Map<String, UsecaseTestResFieldDetail> fields;

	Map<String, List<UsecaseTestResFieldDetail>> fieldsList;
}
