package com.rocket.ssafast.workspace.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkspaceListDto {

    private List<WorkspaceDto> workspaces;
}
