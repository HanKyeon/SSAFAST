package com.rocket.ssafast.workspace.dto.request;

import com.rocket.ssafast.figma.domain.FigmaSection;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FigmaSectionDto {
    private Long id;
    private String sectionUrl;
    private String sectionId;
    private String name;


    public FigmaSection toEntity(){
        return FigmaSection.builder()
                .sectionId(sectionId)
                .sectionUrl(sectionUrl)
                .name(name)
                .build();
    }

    public FigmaSection toUpdateEntity(){
        return FigmaSection.builder()
                .id(id)
                .sectionId(sectionId)
                .sectionUrl(sectionUrl)
                .name(name)
                .build();
    }
}
