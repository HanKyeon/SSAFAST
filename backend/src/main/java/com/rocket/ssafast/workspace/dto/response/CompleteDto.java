package com.rocket.ssafast.workspace.dto.response;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
public class CompleteDto {
    private int totalApiCount;
    private int completeApiCount;
}
