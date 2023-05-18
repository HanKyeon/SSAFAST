package com.rocket.ssafast.apispec.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiStatusDto {
    @NotNull
    @Min(value = 1)
    private Long apiId;

    @Min(value = 1)
    @Max(value = 4)
    private int status;
}
