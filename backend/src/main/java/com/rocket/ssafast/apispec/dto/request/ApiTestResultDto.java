package com.rocket.ssafast.apispec.dto.request;

import java.time.LocalDateTime;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import com.rocket.ssafast.apispec.domain.Document.element.ApiTestResultInfo;
import com.rocket.ssafast.apispec.domain.Entity.ApiTestResultEntity;
import com.rocket.ssafast.member.domain.Member;
import com.rocket.ssafast.member.dto.response.ResMemberDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ApiTestResultDto {

	@NotEmpty
	private String name;

	private ResMemberDto member;

	@NotNull
	private Long apiInfoId;

	@Valid
	@NotNull
	ApiExecReqMessageDto request;

	@Valid
	@NotNull
	ApiTestResultResponseDto response;

	public ApiTestResultInfo toInfo() {
		return ApiTestResultInfo.builder()
			.request(request.toApiTestResultRequest())
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
