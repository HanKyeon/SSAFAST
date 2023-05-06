package com.rocket.ssafast.apispec.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rocket.ssafast.member.dto.response.ResMemberSummaryDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiTestResultSummaryDto {
	private Long id;
	private String name;
	private Long apiInfoId;
	private ResMemberSummaryDto member;
	@JsonFormat(pattern = "yy.MM.dd HH:mm")
	private LocalDateTime createdTime;
}
