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
public class HeaderField {
    private String keyName;
    private int type;
    private String desc;
    private List<String> constraints;

    public com.rocket.ssafast.apispec.domain.Document.element.HeaderField convertTo(){
        return new com.rocket.ssafast.apispec.domain.Document.element.HeaderField(this.keyName, this.type, this.desc, null);
    }
}
