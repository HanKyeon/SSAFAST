package com.rocket.ssafast.dtospec.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseDtoListItem {
    private Long id;
    private String name;
    private String desc;
}
