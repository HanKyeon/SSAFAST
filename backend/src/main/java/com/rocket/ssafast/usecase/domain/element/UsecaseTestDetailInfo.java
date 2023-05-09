package com.rocket.ssafast.usecase.domain.element;

import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

import com.rocket.ssafast.usecase.domain.element.request.UsecaseTestRequest;
import com.rocket.ssafast.usecase.domain.element.response.UsecaseTestResponse;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestDetailInfo {
	@NotEmpty
	String additionalUrl;

	@NotNull
	int order;

	long parent;

	long child;

	@Valid
	@NotNull
	UsecaseTestRequest request;

	@Valid
	@NotNull
	Map<String, UsecaseTestResponse> response;	// key : status code
}
