package com.rocket.ssafast.workspace.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rocket.ssafast.figma.domain.FigmaSection;
import com.rocket.ssafast.workspace.dto.response.CreatedWorkspaceDto;
import com.rocket.ssafast.workspace.dto.response.DetailWorkspaceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name = "workspace")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "figma_url")
    private String figmaUrl;

    @Column(name = "name")
    private String name;

    @Column(name = "favicon")
    private String favicon;

    @Column(name = "description")
    private String description;

    @Column(name = "total_api_count")
    private int totalApiCount;

    @Column(name = "complete_api_count")
    private int completeApiCount;

    @Column(name = "figma_img")
    private String figmaImg;

    @Column(name = "start_date")
    @JsonFormat(pattern = "yyyy-MM-DD")
    private Date startDate;

    @Column(name = "end_date")
    @JsonFormat(pattern = "yyyy-MM-DD")
    private Date endDate;

    @Column(name = "figma_file_id")
    private String figmaFileId;

    @Column(name = "figma_file_name")
    private String figmaFileName;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    @Nullable
    private List<Baseurl> baseurls;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    @Nullable
    private List<FigmaSection> figmaSections;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    private List<WorkspaceMember> teams;

    public void updateBaseurl(List<Baseurl> baseurls) {
        this.baseurls = baseurls;
    }

    public CreatedWorkspaceDto toCreatedDto() {
        return CreatedWorkspaceDto.builder()
                .id(id)
                .build();
    }

    public DetailWorkspaceDto toDetailDto(){
        return DetailWorkspaceDto.builder()
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
