package com.rocket.ssafast.apiexec.dto.request;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultInfo;
import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultRequest;
import com.rocket.ssafast.apiexec.domain.entity.ApiTestResultEntity;
import com.rocket.ssafast.member.dto.response.ResMemberDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ReqApiTestResultSaveDto {

	@NotEmpty
	private String name;

	private ResMemberDto member;

	@NotNull
	private Long apiInfoId;

	private int method;

	String baseUrl;

	@Valid
	@NotNull
	private ApiTestResultRequest request;

	@Valid
	@NotNull
	ReqApiTestResultResponseDto response;

	public ApiTestResultInfo toInfo() {
		return ApiTestResultInfo.builder()
			.apiInfoId(apiInfoId)
			.name(name)
			.member(member)
			.method(method)
			.baseUrl(baseUrl)
			.request(request)
			.response(response.toApiTestResultResponse())
			.build();
	}

	public ApiTestResultEntity toEntity() {
		return ApiTestResultEntity.builder()
			.name(name)
			.member(member.toEntity())
			.apiInfoId(apiInfoId)
			.build();
	}
}
