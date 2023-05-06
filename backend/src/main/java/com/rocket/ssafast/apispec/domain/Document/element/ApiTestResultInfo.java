package com.rocket.ssafast.apispec.domain.Document.element;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiTestResultInfo {

	private ApiTestResultRequest request;

	private ApiTestResultResponse response;
}
