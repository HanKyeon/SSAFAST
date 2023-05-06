package com.rocket.ssafast.apispec.domain.Document;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.rocket.ssafast.apispec.domain.Document.element.ApiTestResultInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("api_test_result_docs")
public class ApiTestResultDocument {

	@Id
	private String id;

	private Map<Long, ApiTestResultInfo> results;
}
