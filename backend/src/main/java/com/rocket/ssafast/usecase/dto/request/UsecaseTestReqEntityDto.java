package com.rocket.ssafast.usecase.dto.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.usecase.domain.UsecaseTestEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsecaseTestReqEntityDto {
	@NotEmpty
	String name;

	String description;

	@NotNull
	Long workspaceId;


	public UsecaseTestEntity toEntity() {
		return UsecaseTestEntity.builder()
			.name(name)
			.description(description)
			.workspaceId(workspaceId)
			.build();
	}
}
