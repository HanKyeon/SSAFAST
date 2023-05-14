package com.rocket.ssafast.apiexec.domain.document.element;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.member.dto.response.ResMemberDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiTestResultInfo {

	@NotEmpty
	private String name;

	private ResMemberDto member;

	@NotNull
	private Long apiInfoId;

	private int method;

	String baseUrl;

	private ApiTestResultRequest request;

	private ApiTestResultResponse response;
}
