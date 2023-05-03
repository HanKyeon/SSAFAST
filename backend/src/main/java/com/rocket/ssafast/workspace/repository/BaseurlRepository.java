package com.rocket.ssafast.workspace.repository;

import com.rocket.ssafast.workspace.domain.Baseurl;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BaseurlRepository extends JpaRepository<Baseurl, Long> {
    List<Baseurl> findAllByWorkspaceId(Long workspaceId);
}
