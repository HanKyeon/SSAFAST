package com.rocket.ssafast.apispec.domain.Entity;

import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apispec.dto.response.CategoryDto;
import com.rocket.ssafast.workspace.domain.Workspace;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "category")
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Workspace.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @Column(name = "name")
    private String name;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    //ref : https://ict-nroo.tistory.com/125
    @OneToMany(mappedBy = "category")
    List<ApiSpecEntity> apiSpecEntityList;

    public void updateName(String name){
        this.name = name;
    }

    public CategoryDto toDto(){
        return CategoryDto.builder()
                .id(id)
                .name(name)
                .build();
    }
}
