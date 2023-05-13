package com.rocket.ssafast.dtospec.domain;

import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "api_has_dto")
/*
api가 삭제 되었을 때는 연관된 dto가 삭제 되지 않아야 하지만,
dto가 삭제 되었을 때는 연관된 api의 정보들을 변경해야 함으로 여기 계십니다.
*/
public class ApiHasDtoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "api_info_id")
    private ApiSpecEntity apiSpecEntity;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "dto_id")
    private DtoSpecEntity dtoSpecEntity;
}
