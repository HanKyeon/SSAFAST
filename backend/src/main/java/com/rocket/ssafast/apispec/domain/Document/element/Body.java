package com.rocket.ssafast.apispec.domain.Document.element;

import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Body {

    private List<BodyField> fields;
    private Map<Long, DtoInfo> nestedDtos;
    private Map<Long, DtoInfo> nestedDtoList;


}
