package com.rocket.ssafast.apiexec.domain.document.element;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ApiTestResultRequestNestedDtoList {

	String keyName;

	String name;

	String desc;

	List<ApiTestResultRequestNestedDto> list;
}
