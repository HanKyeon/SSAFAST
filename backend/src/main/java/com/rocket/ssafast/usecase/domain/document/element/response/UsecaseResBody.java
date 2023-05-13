package com.rocket.ssafast.usecase.domain.document.element.response;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseResBody {
	@Valid
	Map<String, UsecaseResFieldDetail> fields;		// key : name, age 같은 키

	@Valid
	Map<String, UsecaseResNestedDto> nestedDtos;	// key : 내부 dto 이름

	@Valid
	Map<String, List<UsecaseResNestedDto>> nestedDtoLists;	// key : 내부 dto 이름
}
