package com.rocket.ssafast.overload.dto.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OverloadListDto {
    private List<OverloadDto> overlosdList;
}
