package com.rocket.ssafast.workspace.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkspaceFigmaTokenDto {
    private String figmaAccessToken;
    private String figmaRefreshToken;
}
