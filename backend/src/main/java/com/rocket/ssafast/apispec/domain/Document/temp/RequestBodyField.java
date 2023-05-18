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
public class RequestBodyField {
    private String additionalUrl;
    private List<HeaderField> headers;
    private BodyDocs body;
    private List<BodyField> pathVars;
    private List<BodyField> params;

}
