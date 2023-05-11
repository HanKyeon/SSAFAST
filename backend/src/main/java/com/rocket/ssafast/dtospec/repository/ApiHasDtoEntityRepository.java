package com.rocket.ssafast.dtospec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.dtospec.domain.ApiHasDtoEntity;

public interface ApiHasDtoEntityRepository extends JpaRepository<ApiHasDtoEntity, Long> {
	List<ApiHasDtoEntity> findAllByApiSpecEntity(ApiSpecEntity apiSpecEntity);
}
