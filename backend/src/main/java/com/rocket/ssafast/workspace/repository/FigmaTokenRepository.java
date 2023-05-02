package com.rocket.ssafast.workspace.repository;

import com.rocket.ssafast.workspace.domain.FigmaToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FigmaTokenRepository extends JpaRepository<FigmaToken, Long> {
    FigmaToken findByMemberId(Long memberId);
}
