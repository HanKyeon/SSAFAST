package com.rocket.ssafast.apispec.domain.Document.element;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiTestResultResponseDoc {
    private int statusCode;
    private String desc;
    private List<HeaderField> headers;
    private ApiTestForDetailResponseBody body;

}
