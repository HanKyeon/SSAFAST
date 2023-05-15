package com.rocket.ssafast.apiexec.domain.document.element;

import java.util.List;
import java.util.Map;

import com.rocket.ssafast.dtospec.domain.element.FieldInfo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiTestResultRequestBody {

    private List<FieldInfo> fields;

    private Map<Long, List<ApiTestResultRequestNestedDto>> nestedDtos;

    private Map<Long, List<ApiTestResultRequestNestedDtoList>> nestedDtoLists;
}
