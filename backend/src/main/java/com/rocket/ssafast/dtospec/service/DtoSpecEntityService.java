package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.dtospec.domain.ChildDtoEntity;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.domain.ParentDtoEntity;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DtoSpecEntityService {

    private final DtoSpecDocumentService dtoSpecDocumentService;
    private final ChildDtoEntityService childDtoEntityService;
    private final ParentDtoEntityService parentDtoEntityService;

    private final DtoSpecEntityRepository dtoSpecEntityRepository;
    private final ChildDtoEntityRepository childDtoEntityRepository;
    private final ParentDtoEntityRepository parentDtoEntityRepository;

    public Long createDtoEntity(AddDtoSpecDto addDtoSpecDto){
        boolean hasChild = false;

        // 1. 자식 관계 확인
        List<Long> childKeyList = getNestedDtoKeyList(addDtoSpecDto.getDocument());
        if(childKeyList.size()>0 && childKeyList!= null){
            hasChild = true;
        }

        //2. dto insert
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

        // 3. 자식 관계 업데이트
        Long createdDtoId = dtoSpecEntity.getId();
        for(Long childKey : childKeyList){
            DtoSpecEntity childDto = dtoSpecEntityRepository.findById(childKey).get();


            childDtoEntityRepository.save(
                    ChildDtoEntity.builder()
                            .dtoId(createdDtoId)
                            .dtoSpecEntity(dtoSpecEntityRepository.findById(childKey).get())
                            .build()
            );
        }

        // 4. 부모 관계 업데이트
        for(Long childKey : childKeyList){
            parentDtoEntityRepository.save(
                    ParentDtoEntity.builder()
                            .dtoId(childKey)
                            .dtoSpecEntity(dtoSpecEntity)
                            .build()
            );

            //dtoEntity에 부모 정보 업데이트
            DtoSpecEntity childDto = dtoSpecEntityRepository.findById(childKey).get();
            dtoSpecEntityRepository.save(
                    DtoSpecEntity.builder()
                            .id(childDto.getId())
                            .workspaceId(childDto.getWorkspaceId())
                            .name(childDto.getName())
                            .description(childDto.getDescription())
                            .hasParent(true)
                            .hasChild(childDto.isHasChild())
                            .build()
            );
        }

        // 5. mongodb 저장
        DtoInfo dtoInfo =
                DtoInfo.builder()
                        .fields(addDtoSpecDto.getDocument().getFields())
                        .nestedDtos(addDtoSpecDto.getDocument().getNestedDtos())
                        .build();

        dtoSpecDocumentService.createDtoDocs(createdDtoId, dtoInfo);

        return dtoSpecEntity.getId();
    }

    public List<Long> getNestedDtoKeyList(DtoInfo nestedDto){
        /*
         *  자식이 선을 넘은 경우(depth 2이상) 에러 반환
         *  아닌 경우 자식의 keyList 반환
         * */
        List<Long> results = new ArrayList<>();

        for(Map.Entry<Long, DtoInfo> entries : nestedDto.getNestedDtos().entrySet()){
            Long key = entries.getKey();
            Map<Long, DtoInfo> dto = entries.getValue().getNestedDtos();

            //db에 저장된 값이 없는 dto인 경우
            Optional<DtoSpecEntity> getOptionalChildDto = dtoSpecEntityRepository.findById(key);
            if(!getOptionalChildDto.isPresent()){
                throw new CustomException(ErrorCode.DTO_NOT_FOUND);
            }
            //user input 으로 들어온 dto 검증 및 database 정보 검증
            if(dto.size() >0 ||
                    dto !=null ||
                    childDtoIsExist(key) ||
                    getOptionalChildDto.get().isHasChild()){
                throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
            }

            results.add(key);
        }

        return results;
    }


    public UpdateDtoSpecDto updateDtoEntity(Long dtoId, UpdateDtoSpecDto updateDtoSpecDto){

        //1. check if dto not exists
        Optional<DtoSpecEntity> dtoSpecEntity = dtoSpecEntityRepository.findById(dtoId);
        if(!optionalObjectIsAvailable(dtoSpecEntity)){
            throw new CustomException(ErrorCode.DTO_NOT_FOUND);
        }

        //1.1 자식 dto 정보 가져오기
        Map<Long, DtoInfo> childDtos = updateDtoSpecDto.getDocument().getNestedDtos();

        //2. check dto's depth available
        DtoSpecEntity currentDtoEntity = dtoSpecEntity.get();
        boolean hasParent = currentDtoEntity.isHasParent();
        boolean hasChild = currentDtoEntity.isHasChild();
        boolean isChildDtoNested = (childDtos!=null || childDtos.size() > 0)? true:false;
        boolean savable = !hasParent & isChildDtoNested;

        //2.1 부모도 있고 입력 받은 데이터가 자식도 있는경우(db에 부모도 자식도 있는 경우는 없음)
        if(savable){
            throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
        }

        // 이 아래는 부모는 있으나 자식 dto가 없는 경우이거나, 부모가 없고 자식이 있는 경우이다.

        //2.2 부모가 없고 자식이 있는 경우
        List<Long> childKeyList = getNestedDtoKeyList(updateDtoSpecDto.getDocument());
        if(childKeyList.size()>0 && childKeyList!= null){
            hasChild = true;
        }

        //2.2.1 (데이터베이스) 자식이 다른 자식을 가지고 있는 경우 & 자식이 없는 경우는 true 유지
        for(Long key : childKeyList){
            List<ChildDtoEntity> childHasChildList = childDtoEntityRepository.findByDtoId(key);
            if(childHasChildList.size() >0){
                savable = false;
                break;
            }
        }

        //2.2.2 (사용자 인풋)자식이 다른 자식을 가지고 있는 경우 & 자식이 없는 경우는 true 유지
        for(Map.Entry<Long, DtoInfo> entries : childDtos.entrySet()){
            Long _key = entries.getKey();
            Map<Long, DtoInfo> value = entries.getValue().getNestedDtos();

            if(value !=null || value.size() >0){
                savable = false;
                break;
            }
        }

        //2.2.* 를 거쳐 저장 결과에 따른 로직 실행
        if(!savable){
            throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
        }

        //3. update dto entity info
        DtoSpecEntity updateEntity
                = DtoSpecEntity.builder()
                    .id(dtoId)
                    .name(updateDtoSpecDto.getName())
                    .description(updateDtoSpecDto.getDescription())
                    .hasParent(hasParent)
                    .hasChild(hasChild)
                    .build();

        dtoSpecEntityRepository.save(updateEntity);

        //4. parent, child table update 해야함
        if(hasChild){
            //4.1 update 된 dto 의 자식관계 업데이트
            childDtoEntityService.updateChildDtoEntityInfoCascade(dtoId, childKeyList);
            //4.2 update 된 dto 들의 부모관계 업데이트
            parentDtoEntityService.updateParentDtoEntityInfoCascade(dtoId, childKeyList);
        }

        return updateDtoSpecDto;
    }

    public DtoSpecEntity getDtoSpecEntityById(Long dtoId){
        Optional<DtoSpecEntity> dto = dtoSpecEntityRepository.findById(dtoId);
        if(!optionalObjectIsAvailable(dto)){
            throw new CustomException(ErrorCode.DTO_NOT_FOUND);
        }
        return dto.get();
    }

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

