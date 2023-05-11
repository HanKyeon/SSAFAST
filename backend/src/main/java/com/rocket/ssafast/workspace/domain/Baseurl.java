package com.rocket.ssafast.workspace.domain;

import com.rocket.ssafast.workspace.dto.response.BaseurlDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Entity(name = "baseurl")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class Baseurl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "is_certified")
    private Boolean isCertified;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    public void updateCertified(boolean flag){
        isCertified = flag;
    }

    public BaseurlDto toDto(){
        return BaseurlDto.builder()
                .id(id)
                .url(url)
                .isCertified(isCertified).build();
    }
}
