package com.rocket.ssafast.apispec.dto.request;

import com.rocket.ssafast.apispec.domain.Document.temp.ApiSpecDoc;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiSpecInfoDto {
    private Long workspaceId;
    private String name;
    private String description;
    private int method;
    private Long baseUrl;
    private Long categoryId;
    private int status;
    private ApiSpecDoc document;
}
