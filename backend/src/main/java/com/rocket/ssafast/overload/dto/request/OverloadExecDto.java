package com.rocket.ssafast.overload.dto.request;

import com.rocket.ssafast.apispec.dto.request.ApiExecReqMessageDto;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OverloadExecDto {
    private ApiExecReqMessageDto apiExecReqMessageDto;
    private int duration;
    private int reqSec;
}
