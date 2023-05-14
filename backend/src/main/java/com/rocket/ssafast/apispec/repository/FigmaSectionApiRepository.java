package com.rocket.ssafast.apispec.repository;

import com.rocket.ssafast.apispec.domain.Entity.FigmaSectionApi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FigmaSectionApiRepository extends JpaRepository<FigmaSectionApi, Long> {
    List<FigmaSectionApi> findByFigmaSectionId(Long figmaSectionId);
    boolean existsByFigmaSectionId(Long figmaSectionId);
    void deleteAllByFigmaSectionId(Long figmaSectionId);
}
