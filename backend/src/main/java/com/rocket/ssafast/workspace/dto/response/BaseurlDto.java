package com.rocket.ssafast.workspace.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BaseurlDto {
    private Long id;
    private String url;
    private boolean isCertified;
}
