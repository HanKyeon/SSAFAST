package com.rocket.ssafast.apispec.dto.response;

import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultRequest;
import com.rocket.ssafast.apispec.domain.Document.element.ApiTestResultResponseDoc;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailApiInfoDocument {
    private ApiTestResultRequest request;
    private List<ApiTestResultResponseDoc> response;

}
