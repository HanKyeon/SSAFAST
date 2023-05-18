package com.rocket.ssafast.dtospec.dto.request;

import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import lombok.*;

import javax.validation.constraints.Pattern;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddDtoSpecDto {

    private Long workspaceId;
    @Pattern(regexp = "^[a-zA-Z]*$")
    private String name;
    private String description;
    private DtoInfo document;
}
