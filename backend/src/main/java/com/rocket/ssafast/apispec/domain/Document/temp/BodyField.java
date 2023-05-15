package com.rocket.ssafast.apispec.domain.Document.temp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BodyField {
    private String keyName;
    private int type;
    private String desc;
    private boolean itera;
    private List<String> constraints;
}
