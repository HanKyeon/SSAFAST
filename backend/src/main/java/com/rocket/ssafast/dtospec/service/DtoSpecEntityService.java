package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.dto.request.AddDtoSpecDto;
import com.rocket.ssafast.dtospec.dto.request.UpdateDtoSpecDto;
import com.rocket.ssafast.dtospec.repository.ChildDtoEntityRepository;
import com.rocket.ssafast.dtospec.repository.DtoSpecEntityRepository;
import com.rocket.ssafast.dtospec.repository.ParentDtoEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DtoSpecEntityService {

    private final DtoSpecEntityRepository dtoSpecEntityRepository;
    private final ParentDtoEntityRepository parentDtoEntityRepository;
    private final ChildDtoEntityRepository childDtoEntityRepository;

    public Long createDtoEntity(AddDtoSpecDto addDtoSpecDto, boolean hasChild){

        log.info("in service logic " + addDtoSpecDto.toString());
        DtoSpecEntity dtoSpecEntity
                = dtoSpecEntityRepository.save(
                        DtoSpecEntity.builder().
                                workspaceId(addDtoSpecDto.getWorkspaceId()).
                                name(addDtoSpecDto.getName()).
                                description(addDtoSpecDto.getDescription()).
                                hasParent(false).
                                hasChild(hasChild).
                                build());

        return dtoSpecEntity.getId();
    }
//push 해야해서 급하게 주석함
//    public Long updateDtoEntity(Long dtoId, UpdateDtoSpecDto updateDtoSpecDto, boolean hasParent, boolean hasChild){
        //service level 에서 수정해야함
//        Optional<DtoSpecEntity> dtoSpecEntity = dtoSpecEntityRepository.findById(dtoId);
//
//        if(! optionalObjectIsAvailable(dtoSpecEntity)){
//            throw new CustomException(ErrorCode.DTO_NOT_FOUND);
//        }

//    }

    public boolean childDtoIsExist(Long key){
        Optional<DtoSpecEntity> entity = dtoSpecEntityRepository.findById(key);
        if(entity.isPresent()){
            return entity.get().isHasChild();
        }
        return false;
    }
    public boolean optionalObjectIsAvailable(Optional<?> optionalObject){
        return optionalObject.isPresent();
    }

}

