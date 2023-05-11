package com.rocket.ssafast.usecase.domain.document.element.response;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestResBody {
	@Valid
	Map<String, UsecaseTestResFieldDetail> fields;		// key : name, age 같은 키

	@Valid
	Map<String, UsecaseTestResNestedDto> nestedDtos;	// key : 내부 dto 이름

	@Valid
	Map<String, List<UsecaseTestResNestedDto>> nestedDtoLists;	// key : 내부 dto 이름
}
