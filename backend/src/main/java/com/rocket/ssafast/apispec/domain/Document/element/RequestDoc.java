package com.rocket.ssafast.apispec.domain.Document.element;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RequestDoc {

    private String additionalUrl;
    private List<HeaderField> headers;
    private Body body;
    private List<BodyField> pathVars;
    private List<BodyField> params;

}
