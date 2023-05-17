package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.dtospec.domain.ChildDtoEntity;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.domain.ParentDtoEntity;
import com.rocket.ssafast.dtospec.repository.ChildDtoEntityRepository;
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
public class ChildDtoEntityService {

    private final DtoSpecEntityRepository dtoSpecEntityRepository;
    private final ChildDtoEntityRepository childDtoEntityRepository;

    public boolean updateChildDtoEntityInfoCascade(Long dtoId, List<Long> childKeyList){

        Optional<DtoSpecEntity> updateDto = dtoSpecEntityRepository.findById(dtoId);
        if(!updateDto.isPresent()){ throw new CustomException(ErrorCode.DTO_NOT_FOUND); }

        //1. 기존 dto가 가지고 있던 자식 정보 삭제
        deleteChildDtoEntityInfoCascade(dtoId);

        //2. 새로 자식을 가지게 된 dto 정보 업데이트
        for(Long childKey : childKeyList){
            updateChildDtoEntityInfo(dtoId, childKey);
        }
        return true;
    }

    public boolean updateChildDtoEntityInfo(Long dtoId, Long childDtoId){
        Optional<DtoSpecEntity> childDtoIsExists = dtoSpecEntityRepository.findById(childDtoId);

        if(!childDtoIsExists.isPresent()){
            log.info("why ?? : " + childDtoId+", " +
                    ""+ childDtoIsExists.isPresent()+
                    "," + dtoSpecEntityRepository.findById(childDtoId).isPresent());
            for(DtoSpecEntity dto : dtoSpecEntityRepository.findAll()){
                log.info(dto.toString());
            }
            throw new CustomException(ErrorCode.DTO_NOT_FOUND);
        }
        childDtoEntityRepository.save(
                ChildDtoEntity.builder()
                        .dtoId(dtoId)
                        .dtoSpecEntity(childDtoIsExists.get())
                        .build()
        );

        return true;

    }

    public boolean deleteChildDtoEntityInfoCascade(Long dtoId){

        Optional<DtoSpecEntity> dto = dtoSpecEntityRepository.findById(dtoId);

        if(!dto.isPresent()){ throw new CustomException(ErrorCode.DTO_NOT_FOUND); }

        //삭제 해야 할 자식 리스트 조회
        List<ChildDtoEntity> dtoHasChildList = childDtoEntityRepository.findAllByDtoId(dtoId);
        log.info("dtoHasChildList : "+ dtoHasChildList.toString());

        for(ChildDtoEntity dtoHasChild : dtoHasChildList){
            deleteChildDtoEntityInfo(dtoHasChild);
        }
        return true;
    }

    public void deleteChildDtoEntityInfo(ChildDtoEntity childHasDtoEntity){
        childDtoEntityRepository.delete(childHasDtoEntity);
    }


}
