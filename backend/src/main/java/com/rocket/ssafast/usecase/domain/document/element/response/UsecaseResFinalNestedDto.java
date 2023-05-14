package com.rocket.ssafast.usecase.domain.document.element.response;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseResFinalNestedDto {

	@NotNull
	Boolean itera;

	Map<String, UsecaseResFieldDetail> fields;

	Map<String, List<UsecaseResFieldDetail>> fieldsList;
}
