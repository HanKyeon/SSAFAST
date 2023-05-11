package com.rocket.ssafast.dtospec.domain.element;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DtoInfo {

    private List<FieldInfo> fields;
    private Map<Long, DtoInfo> nestedDtos;

}