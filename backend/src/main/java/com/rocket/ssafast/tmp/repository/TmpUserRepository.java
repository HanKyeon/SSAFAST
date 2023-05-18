package com.rocket.ssafast.tmp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.tmp.domain.TmpUser;

public interface TmpUserRepository extends JpaRepository<TmpUser, Long> {
}
