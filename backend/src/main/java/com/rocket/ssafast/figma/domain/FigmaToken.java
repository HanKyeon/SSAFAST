package com.rocket.ssafast.figma.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.rocket.ssafast.figma.dto.response.ResFigmaTokenDto;

import com.rocket.ssafast.workspace.dto.response.WorkspaceFigmaTokenDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "figma_token")
public class FigmaToken {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	@Column(name = "member_id")
	long memberId;

	@Column(name = "access_token")
	String figmaAccess;

	@Column(name = "refresh_token")
	String figmaRefresh;

	public ResFigmaTokenDto toResDto() {
		return ResFigmaTokenDto.builder()
			.id(id)
			.figmaAccessToken(figmaAccess)
			.figmaRefreshToken(figmaRefresh)
			.build();
	}

	public WorkspaceFigmaTokenDto toWorkspaceDto(){
		return WorkspaceFigmaTokenDto.builder()
				.figmaAccessToken(figmaAccess)
				.figmaRefreshToken(figmaRefresh).build();
	}
}
