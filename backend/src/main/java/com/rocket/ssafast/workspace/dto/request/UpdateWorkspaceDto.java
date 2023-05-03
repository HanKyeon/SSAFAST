package com.rocket.ssafast.workspace.dto.request;

import com.rocket.ssafast.workspace.domain.Workspace;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UpdateWorkspaceDto {
    private Long id;
    private String figmaUrl;
    private String name;
    private String favicon;

    private String description;

    private Integer totalApiCount = 0;
    private Integer completeApiCount = 0;
    private String figmaImg;
    private Date startDate;
    private Date endDate;

    private String figmaFileId;
    private String figmaFileName;


    public Workspace toEntity() {
        return Workspace.builder()
                .id(id)
                .figmaUrl(figmaUrl)
                .name(name)
                .favicon(favicon)
                .description(description)
                .totalApiCount(totalApiCount)
                .completeApiCount(completeApiCount)
                .figmaImg(figmaImg)
                .startDate(startDate)
                .endDate(endDate)
                .figmaFileId(figmaFileId)
                .figmaFileName(figmaFileName)
                .build();
    }
}
