package com.rocket.ssafast.usecase.dto.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.usecase.domain.entity.UsecaseTestEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqUsecaseTestEntityDto {
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
