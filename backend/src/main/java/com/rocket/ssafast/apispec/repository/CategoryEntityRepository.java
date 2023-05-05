package com.rocket.ssafast.apispec.repository;

import com.rocket.ssafast.apispec.domain.Entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryEntityRepository extends JpaRepository<CategoryEntity, Long> {
    Optional<CategoryEntity> findByWorkspaceIdAndName(Long workspaceId, String name);
    List<CategoryEntity> findAllByWorkspaceIdAndName(Long workspaceId, String name);
    List<CategoryEntity> findAllByWorkspaceId(Long workspaceId);
    void deleteAllByWorkspaceId(Long workspaceId);
}
