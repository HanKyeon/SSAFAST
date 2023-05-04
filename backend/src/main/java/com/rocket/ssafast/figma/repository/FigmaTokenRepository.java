package com.rocket.ssafast.figma.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.figma.domain.FigmaToken;

public interface FigmaTokenRepository extends JpaRepository<FigmaToken, Long> {
	Optional<FigmaToken> findByMemberId(long memberId);
	Boolean existsByMemberId(Long memberId);
}
