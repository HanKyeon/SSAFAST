package com.rocket.ssafast.tmp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket.ssafast.tmp.domain.TmpOrder;

public interface TmpOrderRepository extends JpaRepository<TmpOrder, Long> {
}
