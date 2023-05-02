package com.rocket.ssafast.workspace.dto.request;

import com.rocket.ssafast.workspace.domain.FigmaSection;
import com.rocket.ssafast.workspace.domain.Workspace;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UpdateFigmaSectionDto {
    private List<FigmaSectionDto> updateFigmaSections;
}
