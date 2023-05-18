package com.rocket.ssafast.usecase.domain.document.element;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseTestRequest;
import com.rocket.ssafast.usecase.domain.document.element.response.UsecaseResponse;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseDetailInfo {
	@NotEmpty
	String additionalUrl;

	String parent;

	String child;

	@Valid
	@NotNull
	UsecaseTestRequest request;

	@Valid
	@NotNull
	UsecaseResponse response;
}
