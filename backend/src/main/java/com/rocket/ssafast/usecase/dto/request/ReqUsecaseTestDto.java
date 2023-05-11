package com.rocket.ssafast.usecase.dto.request;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.usecase.domain.entity.UsecaseTestEntity;
import com.rocket.ssafast.usecase.domain.document.element.UsecaseTestInfo;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqUsecaseTestDto {

	Long id;

	@NotEmpty
	String name;

	String description;

	@NotNull
	Long workspaceId;

	@Valid
	UsecaseTestInfo usecaseTest;


	public UsecaseTestEntity toEntity() {
		return UsecaseTestEntity.builder()
			.name(name)
			.description(description)
			.workspaceId(workspaceId)
			.build();
	}
}
