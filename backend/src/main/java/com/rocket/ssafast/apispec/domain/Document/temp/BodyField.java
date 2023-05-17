package com.rocket.ssafast.apispec.domain.Document.temp;

import com.rocket.ssafast.dtospec.domain.element.FieldInfo;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BodyField {
    private String keyName;
    private int type;
    private String desc;
    private boolean itera;
    private List<String> constraints;

    public FieldInfo convertTo(){
        return new FieldInfo(
                this.keyName,
                this.type,
                this.desc,
                null,
                this.itera,
                this.constraints == null? new String[0] : this.constraints.toArray(new String[0]));
    }
}
