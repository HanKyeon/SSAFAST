package com.rocket.ssafast.apispec.dto.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ApiCategoryListDto {
    private List<ApiCategoryDto> apiCategories;
}
