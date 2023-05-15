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
public class ApiSpecDoc {
    private RequestBodyField request;
    private List<ResponseField> response;
}

