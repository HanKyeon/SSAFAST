package com.rocket.ssafast.dtospec.repository;

import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DtoSpecEntityRepository extends JpaRepository<DtoSpecEntity, Long> {
    List<DtoSpecEntity> findByWorkspaceId(Long workspaceId);
}