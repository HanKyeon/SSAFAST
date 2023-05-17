package com.rocket.ssafast.dtospec.domain.element;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    private String[] constraints;
}
