package com.rocket.ssafast.apispec.domain.Document.temp;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ApiSpecDoc {
    private RequestBodyField request;
    private List<ResponseField> response;
}

