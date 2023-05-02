package com.rocket.ssafast.figma.dto.request;

import com.rocket.ssafast.figma.domain.FigmaToken;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqFigmaTokenDto {
	Long id;
	Long memberId;
	String figmaRefresh;
	String figmaAccess;

	public FigmaToken toEntity() {
		if(this.id == null) {
			return FigmaToken.builder()
				.memberId(memberId)
				.figmaAccess(figmaAccess)
				.figmaRefresh(figmaRefresh)
				.build();
		} else {
			return FigmaToken.builder()
				.id(id)
				.memberId(memberId)
				.figmaAccess(figmaAccess)
				.figmaRefresh(figmaRefresh)
				.build();
		}
	}
}
