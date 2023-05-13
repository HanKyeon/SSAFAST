package com.rocket.ssafast.apispec.domain.Document.element;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiDoc {
    private RequestDoc request;
    private List<ResponseDoc> response;
}
