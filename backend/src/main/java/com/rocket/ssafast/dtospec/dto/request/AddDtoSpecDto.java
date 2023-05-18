package com.rocket.ssafast.dtospec.dto.request;

import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddDtoSpecDto {

    private Long workspaceId;
    private String name;
    private String description;
    private DtoInfo document;
}
