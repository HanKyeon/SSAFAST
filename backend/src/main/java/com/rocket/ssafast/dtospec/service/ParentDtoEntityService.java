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

import java.util.ArrayList;
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

        /*
        * parent_dto table 은 어떤 객체가 어떤 부모를 가지고 있냐 정보를 지닌다.
        * 어떤 자식들이 부모를 지니게 될 경우의 업데이트를 진행 해 주어야 한다는 이야기이다.
        * 그럼 그 정보가 없는 애들은 어떻게 해야 하냐? 새로 관계를 만들어 주어야 한다.
        * 데이터베이스에 쿼리를 날려서 정보가 없는지 확인 후에 관계를 넣어 주어야 함
        * */

        // 이거 해야함 생각 못했음
        // 업데이트가 되면서 어떤 dto 는 더이상 부모 관계가 아닌 경우가 있음
        // 우선 나(parentDtoId)를 부모로 가지는 entity를 가져와서 모두 제거
        // 그 후에 새로 업데이트 된 키들에 대한 정보 업데이트
        // 그 후에 자식 entity의 부모 자식 관계를 찾아가며 flag update


        Optional<DtoSpecEntity> parentDto = dtoSpecEntityRepository.findById(parentDtoId);
        if(!parentDto.isPresent()){
            throw new CustomException(ErrorCode.DTO_NOT_FOUND);
        }

        //case 2
        //1. findByDtoIdAndParentDtoId 로 부모정보를 가지지 않은 key 선별
        List<Long> updateCandidateKeys = new ArrayList<>();
        for(Long childKey : childKeyList){
            Optional<ParentDtoEntity> getParentInfosByParentDto = parentDtoEntityRepository.findByDtoIdAndDtoSpecEntity(childKey, parentDto.get());
            if(!getParentInfosByParentDto.isPresent()){
                updateCandidateKeys.add(childKey);
            }
        }
        //2. findByDtoId 를 통해 List<Entity>.size() >0 ? hasParent=ture : hasParent=false 실행
        boolean hasParent = updateCandidateKeys.size() >0 ? true : false;
        //2. 새로운 부모정보를 업데이트
        for(Long childKey : updateCandidateKeys){
            updateParentDtoEntityInfo(childKey, parentDto.get(), hasParent);
        }


        //

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
            throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
        }

        dtoSpecEntityRepository.save(
                DtoSpecEntity.builder()
                        .id(childEntity.get().getId())
                        .name(childEntity.get().getName())
                        .description(childEntity.get().getDescription())
                        .workspaceId(childEntity.get().getWorkspaceId())
                        .hasParent(hasParent)
                        .hasChild(childEntity.get().isHasChild())
                        .build()
        );

        return true;
    }

    public boolean deleteParentDtoEntityInfoCascade(Long dtoId){
        List<ParentDtoEntity> dtoHasParentList = parentDtoEntityRepository.findByDtoId(dtoId);

        for(ParentDtoEntity dtoHasParent : dtoHasParentList){
            deleteParentDtoEntityInfo(dtoHasParent);
        }

        //need to be update(error나서 일단 씀)
        return true;
    }

    public void deleteParentDtoEntityInfo(ParentDtoEntity parentDtoEntity){

        parentDtoEntityRepository.delete(parentDtoEntity);
    }
}
