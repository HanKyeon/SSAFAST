package com.rocket.ssafast.dtospec.repository;

import com.rocket.ssafast.dtospec.domain.ChildDtoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildDtoEntityRepository extends JpaRepository<ChildDtoEntity, Long> {
    List<ChildDtoEntity> findByDtoId(Long dtoId);
}
