package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.apispec.domain.Document.temp.*;
import com.rocket.ssafast.apispec.repository.ApiSpecDocRepository;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.service.ApiSpecDocumentService;
import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.dtospec.domain.ApiHasDtoEntity;
import com.rocket.ssafast.dtospec.domain.ChildDtoEntity;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.domain.ParentDtoEntity;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.domain.element.FieldDtoInfo;
import com.rocket.ssafast.dtospec.dto.request.AddDtoSpecDto;
import com.rocket.ssafast.dtospec.dto.request.UpdateDtoSpecDto;
import com.rocket.ssafast.dtospec.dto.response.ResponseDtoListItem;
import com.rocket.ssafast.dtospec.repository.ApiHasDtoEntityRepository;
import com.rocket.ssafast.dtospec.repository.ChildDtoEntityRepository;
import com.rocket.ssafast.dtospec.repository.DtoSpecEntityRepository;
import com.rocket.ssafast.dtospec.repository.ParentDtoEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.member.dto.response.ResMemberDto;
import com.rocket.ssafast.workspace.domain.WorkspaceMember;
import com.rocket.ssafast.workspace.repository.WorkspaceMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DtoSpecEntityService {

    private final DtoSpecDocumentService dtoSpecDocumentService;
    private final ChildDtoEntityService childDtoEntityService;
    private final ParentDtoEntityService parentDtoEntityService;
    private final ApiSpecDocumentService apiSpecDocumentService;

    private final DtoSpecEntityRepository dtoSpecEntityRepository;
    private final ChildDtoEntityRepository childDtoEntityRepository;
    private final ParentDtoEntityRepository parentDtoEntityRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final ApiHasDtoEntityRepository apiHasDtoEntityRepository;
    private final ApiSpecRepository apiSpecRepository;

    public Long createDtoEntity(AddDtoSpecDto addDtoSpecDto){
        boolean hasChild = false;

        // 1. 자식 관계 확인
        List<Long> childKeyList = getNestedDtoKeyList(addDtoSpecDto.getDocument());
        if(childKeyList!= null && childKeyList.size()>0){
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
                        .itera(addDtoSpecDto.getDocument().isItera())
                        .fields(addDtoSpecDto.getDocument().getFields())
                        .nestedDtos(addDtoSpecDto.getDocument().getNestedDtos())
                        .build();

        dtoSpecDocumentService.createOrUpdateDtoDocs(createdDtoId, dtoInfo);

        return dtoSpecEntity.getId();
    }

    public List<Long> getNestedDtoKeyList(DtoInfo nestedDto){
        /*
         *  자식이 선을 넘은 경우(depth 2이상) 에러 반환
         *  아닌 경우 자식의 keyList 반환
         * */
        List<Long> results = new ArrayList<>();

        if(nestedDto.getNestedDtos() == null || nestedDto.getNestedDtos().size() <1){
            return results;
        }

        for(Map.Entry<Long, List<FieldDtoInfo>> entries : nestedDto.getNestedDtos().entrySet()){
            Long key = entries.getKey();
            List<FieldDtoInfo> dtos = entries.getValue();

            //db에 저장된 값이 없는 dto인 경우
            Optional<DtoSpecEntity> getOptionalChildDto = dtoSpecEntityRepository.findById(key);
            if(!getOptionalChildDto.isPresent()){
                throw new CustomException(ErrorCode.DTO_NOT_FOUND);
            }
            //user input 으로 들어온 dto 검증 및 database 정보 검증
            for(FieldDtoInfo userInputNestedDto : dtos) {
                log.info(dtos.toString());
                if (userInputNestedDto.getNestedDtos() == null
                        || userInputNestedDto.getNestedDtos().size() < 1
                        || !getOptionalChildDto.get().isHasChild()) {
                    results.add(key);
                }
                else{
                    throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
                }
            }
        }

        return results;
    }

    public AddDtoSpecDto checkInputBeforeUpdateEntityAndUpdate(Long memberId, Long dtoId, AddDtoSpecDto updateDtoSpecDto){

        //0. validation check for member is authenticated input resources
        Optional<WorkspaceMember> isAuthenticate = workspaceMemberRepository.findByWorkspaceIdAndMemberId(updateDtoSpecDto.getWorkspaceId(), memberId);
        if(!isAuthenticate.isPresent()){
            throw new CustomException(ErrorCode.USER_ACCESS_UNAUTHORIZED_RESOURCE);
        }

        //1. get entity for check relation for other dtos(parent, child info)
        DtoSpecEntity dtoSpecEntity = getDtoSpecEntityById(dtoId);
        Map<Long, List<FieldDtoInfo>> childDtos = updateDtoSpecDto.getDocument().getNestedDtos();
        boolean hasParent = dtoSpecEntity.isHasParent();
        boolean hasChild = false;

        if(childDtos == null || childDtos.isEmpty()){
            //pass
        }
        else{
            hasChild = true;
        }

        List<Long> childKeyList = new ArrayList<>();

        //2. check child has child
        for(Long childKey : childDtos.keySet()){
            if(childDtoIsExist(childKey)){
                log.info("1번입니다");
                throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
            }
            childKeyList.add(childKey);
        }

        //current dto has parent and child
        if(hasChild && hasParent){
            log.info("2번입니다");
            throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
        }

        return updateDtoEntity(dtoId, updateDtoSpecDto, hasParent, hasChild, childKeyList);

    }

    public AddDtoSpecDto updateDtoEntity(Long dtoId, AddDtoSpecDto updateDtoSpecDto,
                                         boolean hasParent, boolean hasChild,
                                         List<Long> childKeyList){
        DtoSpecEntity dto = getDtoSpecEntityById(dtoId);

        // update dto entity info
        DtoSpecEntity updateEntity
                = DtoSpecEntity.builder()
                    .id(dto.getId())
                    .workspaceId(dto.getWorkspaceId())
                    .name(updateDtoSpecDto.getName())
                    .description(updateDtoSpecDto.getDescription())
                    .hasParent(hasParent)
                    .hasChild(hasChild)
                    .build();

        dtoSpecEntityRepository.save(updateEntity);

        Map<Long, List<FieldDtoInfo>> setChildDefaultValue = new HashMap<>();
        for(Map.Entry<Long, List<FieldDtoInfo>> entry : updateDtoSpecDto.getDocument().getNestedDtos().entrySet()){
            Long key = entry.getKey();
            List<FieldDtoInfo> value = entry.getValue();
            List<FieldDtoInfo> convertList = new ArrayList<>();
            for(FieldDtoInfo child : value){
                convertList.add(
                        FieldDtoInfo.builder()
                                .itera(child.isItera())
                                .type(key)
                                .build()
                );
            }
            setChildDefaultValue.put(key, convertList);
        }


        //parent, child table update 해야함
        // update 된 dto 의 자식관계 업데이트
        childDtoEntityService.updateChildDtoEntityInfoCascade(dtoId, childKeyList);
        // update 된 dto 들의 부모관계 업데이트
        parentDtoEntityService.updateParentDtoEntityInfoCascade(dtoId, childKeyList);

        DtoInfo updateDto =
                DtoInfo.builder()
                        .itera(updateDtoSpecDto.getDocument().isItera())
                        .fields(updateDtoSpecDto.getDocument().getFields())
                        .nestedDtos(setChildDefaultValue)
                        .build();

        dtoSpecDocumentService.createOrUpdateDtoDocs(dtoId, updateDto);

        return updateDtoSpecDto;
    }

    public boolean deleteDto(Long dtoId){
        //mysql 제거 후 dtoId를 자식으로 가지고 있는 아이들이 또다른 자식이 없을 경우 entity flag update
        Optional<DtoSpecEntity> targetDtoEntity = dtoSpecEntityRepository.findById(dtoId);
        if(!targetDtoEntity.isPresent()){
            throw new CustomException(ErrorCode.DTO_NOT_FOUND);
        }

        DtoSpecEntity deleteDtoEntity = targetDtoEntity.get();

        if(deleteDtoEntity.isHasChild() && deleteDtoEntity.isHasParent()){
            throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
        }

        //자식을 가지고 있는 경우
        if(deleteDtoEntity.isHasChild()){
            childDtoEntityRepository.findAllByDtoId(dtoId).forEach(childDtoEntity -> {
                childDtoEntityRepository.delete(childDtoEntity);
            });
            parentDtoEntityRepository.findAllByDtoSpecEntity(deleteDtoEntity).forEach(parentDtoEntity -> {
                Long childHasDtoId = parentDtoEntity.getDtoId();
                parentDtoEntityRepository.delete(parentDtoEntity);

                List<ParentDtoEntity> childHasAnotherParents = parentDtoEntityRepository.findAllByDtoId(childHasDtoId);
                if(childHasAnotherParents == null || childHasAnotherParents.isEmpty()){
                    Optional<DtoSpecEntity> childHasDtoEntity = dtoSpecEntityRepository.findById(childHasDtoId);
                    if(!childHasDtoEntity.isPresent()){
                        throw new CustomException(ErrorCode.DTO_NOT_FOUND);
                    }

                    dtoSpecEntityRepository.save(
                            DtoSpecEntity.builder()
                                    .id(childHasDtoEntity.get().getId())
                                    .workspaceId(childHasDtoEntity.get().getWorkspaceId())
                                    .name(childHasDtoEntity.get().getName())
                                    .description(childHasDtoEntity.get().getDescription())
                                    .hasChild(childHasDtoEntity.get().isHasChild())
                                    .hasParent(false)
                                    .build()
                    );
                }
            });

        }

        //부모를 가지고 있는 경우
        if(deleteDtoEntity.isHasParent()){
            childDtoEntityRepository.findAllByDtoSpecEntity(deleteDtoEntity).forEach(childDtoEntity -> {
                Long parentHasDtoId = childDtoEntity.getDtoId();
                childDtoEntityRepository.delete(childDtoEntity);

                List<ChildDtoEntity> parentHasAnotherChilds = childDtoEntityRepository.findAllByDtoId(parentHasDtoId);

                if(parentHasAnotherChilds == null || parentHasAnotherChilds.isEmpty()){
                    Optional<DtoSpecEntity> parentHasDtoEntity = dtoSpecEntityRepository.findById(parentHasDtoId);

                    if(!parentHasDtoEntity.isPresent()){
                        throw new CustomException(ErrorCode.DTO_NOT_FOUND);
                    }

                    dtoSpecEntityRepository.save(
                            DtoSpecEntity.builder()
                                    .id(parentHasDtoEntity.get().getId())
                                    .workspaceId(parentHasDtoEntity.get().getWorkspaceId())
                                    .name(parentHasDtoEntity.get().getName())
                                    .description(parentHasDtoEntity.get().getDescription())
                                    .hasParent(parentHasDtoEntity.get().isHasParent())
                                    .hasChild(false)
                                    .build()
                    );
                }


            });
            parentDtoEntityRepository.findAllByDtoId(dtoId).forEach(parentDtoEntity -> {
                Long parentDtoId = parentDtoEntity.getDtoSpecEntity().getId();
                DtoInfo parentDtoDoc = dtoSpecDocumentService.findByDtoId(parentDtoId);
                Map<Long, List<FieldDtoInfo>> parentNestedDtos = parentDtoDoc.getNestedDtos();
                parentNestedDtos.remove(dtoId);

                DtoInfo updateParentDtoDocs =
                        DtoInfo.builder()
                                .name(parentDtoDoc.getName())
                                .itera(parentDtoDoc.isItera())
                                .fields(parentDtoDoc.getFields())
                                .nestedDtos(parentNestedDtos)
                                .build();

                dtoSpecDocumentService.createOrUpdateDtoDocs(parentDtoId, updateParentDtoDocs);
                parentDtoEntityRepository.delete(parentDtoEntity);

            });
        }

        //dtoId를 api nestedDtos 에 가지고 있는 아이들 조회
        for(ApiHasDtoEntity apiHasDto : apiHasDtoEntityRepository.findAllByDtoSpecEntity(targetDtoEntity.get())){
            // Api Document request, response 순회하면서 target dto 제거
            Long apiId = apiHasDto.getApiSpecEntity().getId();
            ApiSpecDoc apiDocs = apiSpecDocumentService.getApiSpecDocs(apiId);

            //request
            Map<Long, List<BodyField>> newNestedDtos = apiDocs.getRequest().getBody().getNestedDtos();
            newNestedDtos.remove(dtoId);

            RequestBodyField newRequest =
                    RequestBodyField.builder()
                            .additionalUrl(apiDocs.getRequest().getAdditionalUrl())
                            .headers(apiDocs.getRequest().getHeaders())
                            .params(apiDocs.getRequest().getParams())
                            .pathVars(apiDocs.getRequest().getPathVars())
                            .body(
                                    BodyDocs.builder()
                                            .fields(apiDocs.getRequest().getBody().getFields())
                                            .nestedDtos(newNestedDtos)
                                            .build()
                            )
                            .build();

            //response
            List<ResponseField> newResponse = new ArrayList<>();
            for(ResponseField objectByStatusCode : apiDocs.getResponse()){
                Map<Long, List<BodyField>> newNestedDtoByStatusCode = objectByStatusCode.getBody().getNestedDtos();
                newNestedDtoByStatusCode.remove(dtoId);

                newResponse.add(
                        ResponseField.builder()
                                .statusCode(objectByStatusCode.getStatusCode())
                                .desc(objectByStatusCode.getDesc())
                                .headers(objectByStatusCode.getHeaders())
                                .body(
                                        BodyDocs.builder()
                                                .fields(objectByStatusCode.getBody().getFields())
                                                .nestedDtos(newNestedDtoByStatusCode)
                                                .build()
                                )
                                .build()
                );
            }

            //새로운 request, response 정보 갱신 후 저장
            apiSpecDocumentService.updateApiSpec(
                    apiId,
                    ApiSpecDoc.builder()
                            .request(newRequest)
                            .response(newResponse)
                            .build()
            );
            //apiHasDto 삭제
            apiHasDtoEntityRepository.delete(apiHasDto);
        }

        //dtoSpecDocument에서 dtoId 가진 dto 제거
        dtoSpecDocumentService.deleteDtoDocs(dtoId);
        //dtoSpecEntity에서 dtoId 가진 dto 제거
        dtoSpecEntityRepository.delete(targetDtoEntity.get());
        return true;
    }

    public DtoInfo getDtoSpecEntity(Long dtoId){
        DtoInfo dtoDocs = dtoSpecDocumentService.findByDtoId(dtoId);
        Optional<DtoSpecEntity> dtoEntity = dtoSpecEntityRepository.findById(dtoId);
        if(!dtoEntity.isPresent()){
            throw new CustomException(ErrorCode.DTO_NOT_FOUND);
        }

        return DtoInfo.builder()
                .name(dtoEntity.get().getName())
                .keyName(dtoDocs.getKeyName())
                .desc(dtoEntity.get().getDescription())
                .itera(dtoDocs.isItera())
                .fields(dtoDocs.getFields())
                .nestedDtos(dtoDocs.getNestedDtos())
                .build();
    }

    public List<ResponseDtoListItem> getDtoListByWorkspaceId(Long workspaceId){
        List<DtoSpecEntity> dtoEntityList = dtoSpecEntityRepository.findByWorkspaceId(workspaceId);
        List<ResponseDtoListItem> results = new ArrayList<>();
        for(DtoSpecEntity dtoSpecEntity : dtoEntityList){
            results.add(
                    ResponseDtoListItem.builder()
                            .id(dtoSpecEntity.getId())
                            .name(dtoSpecEntity.getName())
                            .desc(dtoSpecEntity.getDescription())
                            .build()
            );
        }
        return results;
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

