package com.rocket.ssafast.dtospec.repository;

import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.dtospec.domain.ApiHasDtoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiHasDtoEntityRepository extends JpaRepository<ApiHasDtoEntity, Long> {
    List<ApiHasDtoEntity> findByApiSpecEntity(ApiSpecEntity apiSpecEntity);
}
