package com.rocket.ssafast.tmp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.tmp.domain.TmpItem;

public interface TmpItemRepository extends JpaRepository<TmpItem, Long> {
}
