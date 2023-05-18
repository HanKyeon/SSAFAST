package com.rocket.ssafast.overload.repository;

import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.overload.domain.OverloadTestHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OverloadTestHistoryRepository extends JpaRepository<OverloadTestHistory, Long> {
    List<OverloadTestHistory> findAllByApiSpecEntity(ApiSpecEntity apiSpec);
}
