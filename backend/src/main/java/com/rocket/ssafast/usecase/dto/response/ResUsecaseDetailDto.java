package com.rocket.ssafast.usecase.dto.response;

import com.rocket.ssafast.usecase.domain.document.element.UsecaseInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResUsecaseDetailDto {

	String name;

	String desc;

	UsecaseInfo usecaseTest;
}
