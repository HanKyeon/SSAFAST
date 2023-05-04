package com.rocket.ssafast.dtospec.dto.request;

import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateDtoSpecDto {

    private String name;
    private String description;
    private DtoInfo document;

}
