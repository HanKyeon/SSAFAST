package com.rocket.ssafast.dtospec.repository;

import com.rocket.ssafast.dtospec.domain.ChildDtoEntity;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildDtoEntityRepository extends JpaRepository<ChildDtoEntity, Long> {
    List<ChildDtoEntity> findAllByDtoId(Long dtoId);
    List<ChildDtoEntity> findAllByDtoSpecEntity(DtoSpecEntity dtoSpecEntity);
}
