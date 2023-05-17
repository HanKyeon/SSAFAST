package com.rocket.ssafast.apispec.dto.response;

import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailApiInfoDocument {
    private ApiTestResultRequest request;
    private Object response;

}
