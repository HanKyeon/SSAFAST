package com.rocket.ssafast.dtospec.domain;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity(name = "parent_dto")
public class ParentDtoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dto_id")
    private Long dtoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_dto_id")
    private DtoSpecEntity dtoSpecEntity;
}
