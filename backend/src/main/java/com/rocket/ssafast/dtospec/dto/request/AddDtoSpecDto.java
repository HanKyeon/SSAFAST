package com.rocket.ssafast.dtospec.dto.request;

import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class AddDtoSpecDto {

    private Long workspaceId;
    private String name;
    private String description;
    private DtoInfo document;
}
