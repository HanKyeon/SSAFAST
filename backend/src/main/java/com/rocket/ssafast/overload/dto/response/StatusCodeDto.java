package com.rocket.ssafast.overload.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StatusCodeDto {
    private String code;
    private int count;
}
