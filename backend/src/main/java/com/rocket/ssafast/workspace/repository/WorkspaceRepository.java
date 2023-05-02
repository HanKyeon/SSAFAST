package com.rocket.ssafast.workspace.repository;

import com.rocket.ssafast.workspace.domain.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
}
