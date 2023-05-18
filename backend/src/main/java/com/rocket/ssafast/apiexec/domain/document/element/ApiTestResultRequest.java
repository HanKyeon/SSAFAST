package com.rocket.ssafast.apiexec.domain.document.element;

import java.util.List;

import com.rocket.ssafast.apispec.domain.Document.element.HeaderField;
import com.rocket.ssafast.dtospec.domain.element.FieldInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiTestResultRequest {

	private String additionalUrl;

	private List<HeaderField> headers;

	private List<FieldInfo> pathVars;

	private List<FieldInfo> params;

	private ApiTestResultRequestBody body;
}
