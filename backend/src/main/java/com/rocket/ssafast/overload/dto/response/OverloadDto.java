package com.rocket.ssafast.overload.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OverloadDto {
    private long id;
    private int duration;
    private int reqSec;
    private int latencyMean;
    private int throughput;
    private LocalDateTime createdTime;
}
