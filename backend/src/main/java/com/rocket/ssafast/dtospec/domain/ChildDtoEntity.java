package com.rocket.ssafast.dtospec.domain;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
@ToString
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
