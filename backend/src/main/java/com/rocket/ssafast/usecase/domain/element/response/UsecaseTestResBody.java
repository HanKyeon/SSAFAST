package com.rocket.ssafast.usecase.domain.element.response;

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
}
