package com.rocket.ssafast.figma.domain;

import com.rocket.ssafast.apispec.domain.Entity.FigmaSectionApiEntity;
import com.rocket.ssafast.workspace.domain.Workspace;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.List;

@Entity(name = "figma_section")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class FigmaSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @Column(name = "section_url")
    private String sectionUrl;

    @Column(name = "section_id")
    private String sectionId;

    @Column(name = "name")
    private String name;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = FigmaSectionApiEntity.class)
    private List<FigmaSectionApiEntity> figmaSectionApiEntities;

    public void updateWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }
}
