package com.rocket.ssafast.usecase.dto.request;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.usecase.domain.entity.UsecaseEntity;
import com.rocket.ssafast.usecase.domain.document.element.UsecaseInfo;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqUsecaseDto {

	Long id;

	@NotEmpty
	String name;

	String description;

	@NotNull
	Long workspaceId;

	@Valid
	UsecaseInfo usecaseTest;


	public UsecaseEntity toEntity() {
		return UsecaseEntity.builder()
			.name(name)
			.desc(description)
			.workspaceId(workspaceId)
			.build();
	}
}
