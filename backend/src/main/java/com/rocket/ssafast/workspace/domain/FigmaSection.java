package com.rocket.ssafast.workspace.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

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

    public void updateWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }
}
