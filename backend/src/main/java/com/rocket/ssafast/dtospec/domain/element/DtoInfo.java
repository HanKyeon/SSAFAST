package com.rocket.ssafast.dtospec.domain.element;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.Map;

@Getter
@ToString
@NoArgsConstructor
public class DtoInfo {

    private List<FieldInfo> fields;
    private Map<Long, DtoInfo> nestedDtos;

}
