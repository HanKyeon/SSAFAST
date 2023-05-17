package com.rocket.ssafast.apispec.domain.Document.temp;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ResponseField {
    private int statusCode;
    private String desc;
    private List<HeaderField> headers;
    private BodyDocs body;
}
