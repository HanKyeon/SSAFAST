package com.rocket.ssafast.apispec.dto.response;

import com.rocket.ssafast.member.dto.response.ResMemberDto;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiInfoDto {
    private Long id;
    private String name;
    private String description;
    private String method;
    private String status;
    private ResMemberDto writter;
}
