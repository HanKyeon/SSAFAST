package com.rocket.ssafast.dtospec.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
@Entity(name = "child_dto")
public class ChildDtoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dto_id")
    private Long dtoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_dto_id")
    private DtoSpecEntity dtoSpecEntity;
}
