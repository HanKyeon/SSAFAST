package com.rocket.ssafast.apiexec.dto.request.element;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqApiExecMessageParamDto {

	Boolean itera;

	String value;
}
