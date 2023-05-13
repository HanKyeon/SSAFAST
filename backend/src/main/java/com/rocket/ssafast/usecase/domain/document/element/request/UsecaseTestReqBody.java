package com.rocket.ssafast.usecase.domain.document.element.request;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestReqBody {
	@Valid
	Map<String, UsecaseTestReqFieldDetail> fields;			// key : field 이름 (ex. name, age...)

	@Valid
	Map<String, UsecaseTestReqNestedDto> nestedDtos;		// key : nested dto 이름 (ex. board, comment...)

	@Valid
	Map<String, List<UsecaseTestReqNestedDto>> nestedDtoLists;		// key : nested dto list 이름 (ex. boads, comments...)
}
