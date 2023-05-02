package com.rocket.ssafast.workspace.repository;

import com.rocket.ssafast.workspace.domain.WorkspaceMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, Long> {
    List<WorkspaceMember> findAllByMemberId(Long memberId);
    List<WorkspaceMember> findAllByWorkspaceId(Long workspaceId);
}
