package com.rocket.ssafast.overload.dto.response;

import com.rocket.ssafast.workspace.dto.response.BaseurlDto;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CheckBaseurlDto {
    private boolean certification;
    private List<BaseurlDto> baseurls;
}
