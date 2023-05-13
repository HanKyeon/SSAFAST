package com.rocket.ssafast.apispec.domain.Document.element;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HeaderField {

    private String keyName;
    private int type;
    private String desc;
    private String value;

}
