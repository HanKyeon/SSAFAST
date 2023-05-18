package com.rocket.ssafast.overload.dto.response;

import lombok.*;

import java.util.HashMap;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OverloadTestResDto {

    private LatenciesDto latencies;
    private int duration;
    private int requests;
    private int throughput;
    private int success;
    private List<StatusCodeDto> statusCodes;

}
