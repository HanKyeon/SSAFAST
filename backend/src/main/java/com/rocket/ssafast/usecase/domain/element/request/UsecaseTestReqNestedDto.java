package com.rocket.ssafast.usecase.domain.element.request;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotNull;

public class UsecaseTestReqNestedDto {

	@NotNull
	Boolean itera;

	Map<String, UsecaseTestReqFieldDetail> fields;

	List<Map<String, UsecaseTestReqFieldDetail>> fieldsList;
}
