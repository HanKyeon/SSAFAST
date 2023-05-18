package com.rocket.ssafast.overload.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LatenciesDto {
    private int total;
    private int mean;
    private int fiftieth;
    private int ninetyFifth;
    private int ninetyNinth;
    private int max;

}
