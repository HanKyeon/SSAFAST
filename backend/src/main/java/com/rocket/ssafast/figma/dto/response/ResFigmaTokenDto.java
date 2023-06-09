package com.rocket.ssafast.figma.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResFigmaTokenDto {
	Long id;
	String figmaRefreshToken;
	String figmaAccessToken;
}
