package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.dtospec.domain.ChildDtoEntity;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.repository.ChildDtoEntityRepository;
import com.rocket.ssafast.dtospec.repository.DtoSpecEntityRepository;
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

        deleteChildDtoEntityInfoCascade(dtoId);

        for(Long childKey : childKeyList){
            updateChildDtoEntityInfo(dtoId, childKey);
        }
        return true;
    }

    public boolean updateChildDtoEntityInfo(Long dtoId, Long childDtoId){
        Optional<DtoSpecEntity> childDtoIsExists = dtoSpecEntityRepository.findById(childDtoId);

        if(!childDtoIsExists.isPresent()){
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
        List<ChildDtoEntity> dtoHasChildList = childDtoEntityRepository.findByDtoId(dtoId);

        for(ChildDtoEntity dtoHasChild : dtoHasChildList){
            deleteChildDtoEntityInfo(dtoHasChild);
        }
        return true;
    }

    public void deleteChildDtoEntityInfo(ChildDtoEntity childDtoEntity){
        childDtoEntityRepository.delete(childDtoEntity);
    }

}
