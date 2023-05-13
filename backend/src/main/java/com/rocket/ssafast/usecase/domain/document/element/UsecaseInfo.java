package com.rocket.ssafast.usecase.domain.document.element;

import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseInfo {
	@NotNull
	String rootApiId;

	@Valid
	@NotNull
	Map<String, UsecaseDetailInfo> testDetails;	// key : api id, value : api detail
}
