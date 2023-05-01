package com.rocket.ssafast.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByEmail(String email);
	List<Member> findByEmailContaining(String email);
}
