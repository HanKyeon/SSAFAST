package com.rocket.ssafast.apispec.repository;

import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApiSpecRepository extends JpaRepository<ApiSpecEntity, Long> {
    List<ApiSpecEntity> findAllByCategoryId(Long rootCategoryId);
}
