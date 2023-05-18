package com.rocket.ssafast.apiexec.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.apiexec.domain.entity.ApiTestResultEntity;

public interface ApiTestResultEntityRepository extends JpaRepository<ApiTestResultEntity, Long> {
	List<ApiTestResultEntity> findAllByApiInfoId(Long apiId);
}
