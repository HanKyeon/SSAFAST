package com.rocket.ssafast.figma.repository;

import com.rocket.ssafast.figma.domain.FigmaSection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FigmaSectionRepository extends JpaRepository<FigmaSection, Long> {
    List<FigmaSection> findAllByWorkspaceId(Long workspaceId);
}
