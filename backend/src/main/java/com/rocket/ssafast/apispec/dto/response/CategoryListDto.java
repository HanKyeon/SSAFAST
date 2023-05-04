package com.rocket.ssafast.apispec.dto.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CategoryListDto {
    private List<CategoryDto> categorys;
}
