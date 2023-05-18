package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.domain.ParentDtoEntity;
import com.rocket.ssafast.dtospec.repository.DtoSpecEntityRepository;
import com.rocket.ssafast.dtospec.repository.ParentDtoEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor

public class ParentDtoEntityService {

    private final ParentDtoEntityRepository parentDtoEntityRepository;
    private final DtoSpecEntityRepository dtoSpecEntityRepository;

    public boolean updateParentDtoEntityInfoCascade(Long parentDtoId, List<Long> childKeyList){

        Optional<DtoSpecEntity> parentDto = dtoSpecEntityRepository.findById(parentDtoId);
        if(!parentDto.isPresent()){
            throw new CustomException(ErrorCode.DTO_NOT_FOUND);
        }

        //1. 기존 dto를 부모로 가지고 있던 dto에 대한 정보 삭제
        deleteParentDtoEntityInfoCascade(parentDto.get());

        //2. 새로 부모를 가지게 된 dto 들의 정보 업데이트
        for(Long childKey : childKeyList){
            updateParentDtoEntityInfo(childKey, parentDto.get(), true);
        }

        return true;
    }

    public boolean updateParentDtoEntityInfo(Long childKey, DtoSpecEntity parentEntity, boolean hasParent){
        parentDtoEntityRepository.save(
                ParentDtoEntity.builder()
                        .dtoId(childKey)
                        .dtoSpecEntity(parentEntity)
                        .build()
        );

        Optional<DtoSpecEntity> childEntity = dtoSpecEntityRepository.findById(childKey);

        if(!childEntity.isPresent()){
            throw new CustomException(ErrorCode.DTO_NOT_FOUND);
        }
        if(childEntity.get().isHasChild() & hasParent){
            log.info("3번입니다");
            log.info(childEntity.get().toString());
            throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
        }

        dtoSpecEntityRepository.save(
                DtoSpecEntity.builder()
                        .id(childEntity.get().getId())
                        .workspaceId(childEntity.get().getWorkspaceId())
                        .name(childEntity.get().getName())
                        .description(childEntity.get().getDescription())
                        .hasParent(hasParent)
                        .hasChild(childEntity.get().isHasChild())
                        .build()
        );

        return true;
    }

    public boolean deleteParentDtoEntityInfoCascade(DtoSpecEntity parentDto){
        List<ParentDtoEntity> relatedBeforeEntities = parentDtoEntityRepository.findAllByDtoSpecEntity(parentDto);
        for(ParentDtoEntity entity : relatedBeforeEntities){
            Long entityId = entity.getDtoId();
            deleteParentDtoEntityInfo(entityId, entity);
        }
        return true;
    }

    public void deleteParentDtoEntityInfo(Long childKey, ParentDtoEntity entity){

        parentDtoEntityRepository.delete(entity);
        // 부모가 사라진 경우가 된다면
        if(parentDtoEntityRepository.findAllByDtoId(childKey).size()<1){
            DtoSpecEntity entityInfo = dtoSpecEntityRepository.findById(childKey).get();
            // 정보 갱신
            dtoSpecEntityRepository.save(
                    DtoSpecEntity.builder()
                            .id(entityInfo.getId())
                            .workspaceId(entityInfo.getWorkspaceId())
                            .name(entityInfo.getName())
                            .description(entityInfo.getDescription())
                            .hasParent(false)
                            .hasChild(entityInfo.isHasChild())
                            .build()
            );
        }
    }


}
