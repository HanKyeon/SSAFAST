package com.rocket.ssafast.apiexec.domain.document.element;

import java.util.List;
import java.util.Map;

import com.rocket.ssafast.dtospec.domain.element.FieldInfo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiTestResultRequestBody {

    private List<FieldInfo> fields;

    private Map<Long, List<ApiTestResultRequestNestedDto>> nestedDtos;

    private Map<Long, List<ApiTestResultRequestNestedDtoList>> nestedDtoLists;
}
