package com.rocket.ssafast.apispec.domain.Document.element;

import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultRequestNestedDto;
import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultRequestNestedDtoList;
import com.rocket.ssafast.dtospec.domain.element.FieldInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiTestForDetailResponseBody {

    private List<FieldInfo> fields;

    private Map<Long, List<ApiTestResultRequestNestedDto>> nestedDtos;

    private Map<Long, List<ApiTestResultRequestNestedDtoList>> nestedDtoLists;
}
