package com.rocket.ssafast.apispec.dto.response;

import com.rocket.ssafast.member.dto.response.ResMemberDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailApiInfoForTestDto {
    private Long apiId;
    private String name;
    private String description;
    private int method;
    private int status;
    private Long baseurlId;
    private Long categoryId;
    private ResMemberDto member;
    private LocalDateTime createdTime;
    private DetailApiInfoDocument document;
}
