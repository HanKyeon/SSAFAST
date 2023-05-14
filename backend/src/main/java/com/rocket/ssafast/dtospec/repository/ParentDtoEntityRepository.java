package com.rocket.ssafast.dtospec.repository;

import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.domain.ParentDtoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParentDtoEntityRepository extends JpaRepository<ParentDtoEntity, Long> {
    List<ParentDtoEntity> findByDtoId(Long dtoId);
    List<ParentDtoEntity> findByDtoSpecEntity(DtoSpecEntity dtoSpecEntity);
}
