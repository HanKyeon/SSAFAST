package com.rocket.ssafast.apispec.domain.Document.temp;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BodyDocs {
    private List<BodyField> fields;
    private Map<Long, List<BodyField>> nestedDtos;
}
