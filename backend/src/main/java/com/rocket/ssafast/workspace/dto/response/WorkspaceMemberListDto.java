package com.rocket.ssafast.workspace.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class WorkspaceMemberListDto {
    private List<WorkspaceMemberDto> members;
}
