package com.rocket.ssafast.apispec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.apispec.domain.Entity.ApiTestResultEntity;

public interface ApiTestResultEntityRepository extends JpaRepository<ApiTestResultEntity, Long> {
	List<ApiTestResultEntity> findAllByApiInfoId(Long apiId);
}
