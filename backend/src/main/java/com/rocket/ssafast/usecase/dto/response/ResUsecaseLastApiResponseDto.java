package com.rocket.ssafast.usecase.dto.response;

import com.rocket.ssafast.apiexec.dto.request.ReqApiTestResultResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResUsecaseLastApiResponseDto {

	Boolean success;

	Long lastApiId;

	ReqApiTestResultResponseDto lastApiResponse;
}
