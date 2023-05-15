package com.rocket.ssafast.usecase.domain.document.element.request;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseReqNestedDto {

	@NotEmpty
	String name;

	String desc;

	@Valid
	Map<String, UsecaseReqFieldDetail> fields;

	@Valid
	Map<String, UsecaseReqNestedDto> nestedDtos;				// key : nested dto 이름 (ex. board, comment...)

	@Valid
	Map<String, List<UsecaseReqNestedDto>> nestedDtoList;		// key : nested dto list 이름 (ex. boads, comments...)
}