package com.rocket.ssafast.dtospec.domain;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Slf4j
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "dto")
public class DtoSpecEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "workspace_id")
    private Long workspaceId;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "has_parent")
    @ColumnDefault("0")
    private boolean hasParent;

    @Column(name = "has_child")
    @ColumnDefault("0")
    private boolean hasChild;

}
