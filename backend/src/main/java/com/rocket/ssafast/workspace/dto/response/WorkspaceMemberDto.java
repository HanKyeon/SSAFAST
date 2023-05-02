package com.rocket.ssafast.workspace.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class WorkspaceMemberDto {
    private Long id;
    private String name;
    private String profileImg;
}
