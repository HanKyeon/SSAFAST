package com.rocket.ssafast.workspace.dto.response;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class FigmaTokenDto {
    private String figmaAccessToken;
    private String figmaRefreshToken;
}
