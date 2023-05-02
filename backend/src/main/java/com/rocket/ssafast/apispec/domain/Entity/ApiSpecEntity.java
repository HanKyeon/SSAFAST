package com.rocket.ssafast.apispec.domain.Entity;

import com.rocket.ssafast.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "api_info")
public class ApiSpecEntity {
/*
* Enum value list
* method : HTTPMethod
* status : APIStatus
* */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "method")
    private int method;

    @Column(name = "status")
    private int status;

    @Column(name = "baseurl_id")
    private Long baseurlId;

    @Column(name = "category_id")
    private Long categoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "created_time")
    @CreationTimestamp
    private LocalDateTime createdTime;

}
