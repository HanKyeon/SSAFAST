package com.rocket.ssafast.apispec.dto.response;

import com.rocket.ssafast.workspace.dto.response.BaseurlDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BaseurlsDto {
    private List<BaseurlDto> baseurls;
}
