package com.rocket.ssafast.apispec.dto.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ApiCategoryDto {
    private Long categoryId;
    private String categoryName;

    private List<ApiInfoDto> apis;
}
