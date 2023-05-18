package com.rocket.ssafast.dtospec.domain.element;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FieldDtoInfo {
    private String keyName;
    private Long type;
    private String desc;
    private boolean itera;
    private String[] constraints;
    private Map<Long, List<FieldDtoInfo>> nestedDtos;
}
