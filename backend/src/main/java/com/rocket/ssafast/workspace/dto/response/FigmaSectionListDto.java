package com.rocket.ssafast.workspace.dto.response;

import com.rocket.ssafast.workspace.dto.request.FigmaSectionDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FigmaSectionListDto {
    List<FigmaSectionDto> figmaSections;
}
