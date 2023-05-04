package com.rocket.ssafast.apispec.domain.Entity;

import com.rocket.ssafast.apispec.domain.Enum.APIStatus;
import com.rocket.ssafast.apispec.domain.Enum.HTTPMethod;
import com.rocket.ssafast.apispec.dto.response.ApiInfoDto;
import com.rocket.ssafast.member.domain.Member;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.http.HttpStatus;

import javax.persistence.*;
import java.time.LocalDateTime;

@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "api_info")
@ToString
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "created_time")
    @CreationTimestamp
    private LocalDateTime createdTime;

    public void updateCategory(CategoryEntity categoryEntity){
        this.category = categoryEntity;
    }

    public ApiInfoDto toDto(){
        return ApiInfoDto.builder()
                .id(id)
                .name(name)
                .description(description)
                .method(HTTPMethod.getStatusByNumber(method))
                .status(APIStatus.getStatusByNumber(status))
                .writter(member.toResDto())
                .build();
    }
}
