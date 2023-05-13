package com.rocket.ssafast.apispec.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiExecReqMessageParamDto {

	Boolean itera;

	String value;
}
