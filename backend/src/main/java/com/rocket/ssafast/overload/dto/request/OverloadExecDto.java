package com.rocket.ssafast.overload.dto.request;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OverloadExecDto {
    private int duration;
    private int reqSec;
}
