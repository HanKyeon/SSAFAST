package com.rocket.ssafast.usecase.domain.document.element.request;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestReqNestedDto {

	@NotEmpty
	String dtoName;

	String desc;

	@Valid
	Map<String, UsecaseTestReqFieldDetail> fields;

	@Valid
	Map<String, UsecaseTestReqNestedDto> nestedDtos;				// key : nested dto 이름 (ex. board, comment...)

	@Valid
	Map<String, List<UsecaseTestReqNestedDto>> nestedDtoList;		// key : nested dto list 이름 (ex. boads, comments...)
}