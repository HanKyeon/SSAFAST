package com.rocket.ssafast.apiexec.domain.entity;

import com.rocket.ssafast.apiexec.dto.response.ResApiTestResultSummaryDto;
import com.rocket.ssafast.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "api_test_result")
public class ApiTestResultEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "created_time")
    @CreationTimestamp
    private LocalDateTime createdTime;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "api_info_id")
    private Long apiInfoId;

    public ResApiTestResultSummaryDto toSummaryDto() {
        return ResApiTestResultSummaryDto.builder()
            .id(id)
            .name(name)
            .member(member.toResSummaryDto())
            .apiInfoId(apiInfoId)
            .createdTime(createdTime)
            .build();
    }
}
