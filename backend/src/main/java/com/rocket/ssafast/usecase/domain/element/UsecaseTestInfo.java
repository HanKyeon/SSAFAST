package com.rocket.ssafast.usecase.domain.element;

import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestInfo {
	@NotNull
	long rootApiId;

	@Valid
	@NotNull
	Map<String, UsecaseTestDetailInfo> testDetails;	// key : api id, value : api detail
}
