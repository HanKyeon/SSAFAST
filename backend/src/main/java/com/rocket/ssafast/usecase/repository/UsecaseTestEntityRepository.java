package com.rocket.ssafast.usecase.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.usecase.domain.entity.UsecaseEntity;

public interface UsecaseTestEntityRepository extends JpaRepository<UsecaseEntity, Long> {
}
