package com.rocket.ssafast.usecase.dto.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.rocket.ssafast.usecase.domain.entity.UsecaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqUsecaseEntityDto {
	@NotEmpty
	String name;

	String description;

	@NotNull
	Long workspaceId;


	public UsecaseEntity toEntity() {
		return UsecaseEntity.builder()
			.name(name)
			.desc(description)
			.workspaceId(workspaceId)
			.build();
	}
}
