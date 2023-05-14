package com.rocket.ssafast.apiexec.domain.document.element;

import java.util.List;
import java.util.Map;

import com.rocket.ssafast.dtospec.domain.element.FieldInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiTestResultRequestNestedDto {

	private String keyName;

	private String name;

	private String desc;

	private List<FieldInfo> fields;

	private Map<Long, ApiTestResultRequestNestedDto> nestedDtos;

	private Map<Long, ApiTestResultRequestNestedDtoList> nestedDtoLists;
}
