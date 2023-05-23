package com.rocket.ssafast.usecase.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResUsecaseSummaryDto {

	Long id;

	String name;

	String desc;
}
