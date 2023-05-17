package com.rocket.ssafast.apispec.domain.Document.temp;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class RequestBodyField {
    private String additionalUrl;
    private List<HeaderField> headers;
    private BodyDocs body;
    private List<BodyField> pathVars;
    private List<BodyField> params;

}
