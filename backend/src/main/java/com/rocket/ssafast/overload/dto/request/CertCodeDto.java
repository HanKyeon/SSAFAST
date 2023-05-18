package com.rocket.ssafast.overload.dto.request;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CertCodeDto {
    private Long baseurlId;
    private Integer code;
}
