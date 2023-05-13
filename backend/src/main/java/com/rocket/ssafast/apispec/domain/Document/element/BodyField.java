package com.rocket.ssafast.apispec.domain.Document.element;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BodyField {

    private String keyName;
    private int type;
    private String desc;
    private boolean itera;
    private List<String> constrains;
    private String value;
}
