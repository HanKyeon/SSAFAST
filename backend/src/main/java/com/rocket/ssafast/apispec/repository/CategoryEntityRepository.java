package com.rocket.ssafast.apispec.repository;

import com.rocket.ssafast.apispec.domain.Entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryEntityRepository extends JpaRepository<CategoryEntity, Long> {
}
