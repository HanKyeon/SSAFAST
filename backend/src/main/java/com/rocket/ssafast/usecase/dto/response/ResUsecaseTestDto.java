package com.rocket.ssafast.usecase.dto.response;

import com.rocket.ssafast.apispec.dto.request.ApiTestResultResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResUsecaseTestDto {

	Boolean success;

	Long lastApiId;

	ApiTestResultResponseDto apiTestResultResponseDto;
}
