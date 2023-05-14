package com.rocket.ssafast.dtospec.domain.element;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FieldInfo {
    private String keyName;
    private int type;
    private String desc;
    private String value;
    private boolean itera;
    private List<String> constraints;
}
