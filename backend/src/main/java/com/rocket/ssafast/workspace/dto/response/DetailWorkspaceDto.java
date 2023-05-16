package com.rocket.ssafast.workspace.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rocket.ssafast.figma.dto.response.ResFigmaTokenDto;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailWorkspaceDto {
    private Long id;
    private String figmaUrl;
    private String name;
    private String favicon;
    private String description;
    private int totalApiCount;
    private int completeApiCount;
    private String figmaImg;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    private String figmaFileId;
    private String figmaFileName;
    private List<String> baseurls;

    private Long leaderId;
    private WorkspaceFigmaTokenDto figmaToken;


}
