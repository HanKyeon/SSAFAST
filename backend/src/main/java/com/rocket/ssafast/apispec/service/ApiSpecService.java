package com.rocket.ssafast.apispec.service;

import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultRequest;
import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultRequestBody;
import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultRequestNestedDto;
import com.rocket.ssafast.apiexec.domain.document.element.ApiTestResultRequestNestedDtoList;
import com.rocket.ssafast.apispec.domain.Document.element.ApiDoc;
import com.rocket.ssafast.apispec.domain.Document.element.ApiTestForDetailResponseBody;
import com.rocket.ssafast.apispec.domain.Document.element.ApiTestResultResponseDoc;
import com.rocket.ssafast.apispec.domain.Document.element.HeaderField;
import com.rocket.ssafast.apispec.domain.Document.temp.ApiSpecDoc;
import com.rocket.ssafast.apispec.domain.Document.temp.BodyField;
import com.rocket.ssafast.apispec.domain.Document.temp.ResponseField;
import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apispec.domain.Entity.CategoryEntity;
import com.rocket.ssafast.apispec.dto.request.ApiSpecInfoDto;
import com.rocket.ssafast.apispec.dto.request.ApiStatusDto;
import com.rocket.ssafast.apispec.dto.response.DetailApiInfoDocument;
import com.rocket.ssafast.apispec.dto.response.DetailApiInfoForTestDto;
import com.rocket.ssafast.apispec.dto.response.DetailApiSpecInfoDto;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.repository.CategoryEntityRepository;
import com.rocket.ssafast.dtospec.domain.ApiHasDtoEntity;
import com.rocket.ssafast.dtospec.domain.ChildDtoEntity;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.domain.element.FieldInfo;
import com.rocket.ssafast.dtospec.repository.ApiHasDtoEntityRepository;
import com.rocket.ssafast.dtospec.repository.ChildDtoEntityRepository;
import com.rocket.ssafast.dtospec.repository.DtoSpecEntityRepository;
import com.rocket.ssafast.dtospec.service.DtoSpecDocumentService;
import com.rocket.ssafast.dtospec.service.DtoSpecEntityService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.member.domain.Member;
import com.rocket.ssafast.member.dto.response.ResMemberDto;
import com.rocket.ssafast.member.repository.MemberRepository;
import com.rocket.ssafast.utils.UtilMethods;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ApiSpecService {

    private final MemberRepository memberRepository;
    private final ApiSpecRepository apiSpecRepository;
    private final DtoSpecEntityRepository dtoSpecEntityRepository;
    private final ApiHasDtoEntityRepository apiHasDtoEntityRepository;
    private final CategoryEntityRepository categoryEntityRepository;
    private final ChildDtoEntityRepository childDtoEntityRepository;

    private final DtoSpecEntityService dtoSpecEntityService;
    private final DtoSpecDocumentService dtoSpecDocumentService;
    private final ApiSpecDocumentService apiSpecDocumentService;
    public Long createApiSpec(Long memberId, ApiSpecInfoDto apiSpecInfoDto){

        //category 정보가 null 이면 root 로 넣어주어야 한다
        Optional<CategoryEntity> category = categoryEntityRepository.findById(apiSpecInfoDto.getCategoryId());
        if(!category.isPresent()){
            //workspace id 를 어디서 끌고 온담,,
            category = categoryEntityRepository.findByWorkspaceIdAndName(apiSpecInfoDto.getWorkspaceId(), "/");
        }

        //baseurl도 마찬가지인데 음.. 고민해봅시다(Optional)

        //없는 멤버인 경우 짤
        Optional<Member> member = memberRepository.findById(memberId);
        if(!member.isPresent()){
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        ApiSpecEntity apiSpec = apiSpecRepository.save(
                ApiSpecEntity.builder()
                        .name(apiSpecInfoDto.getName())
                        .description(apiSpecInfoDto.getDescription())
                        .method(apiSpecInfoDto.getMethod())
                        .status(apiSpecInfoDto.getStatus())
                        .baseurlId(apiSpecInfoDto.getBaseUrl())
                        .category(category.get())
                        .member(member.get())
                        .build()
        );

        //update api has dto table
        Set<Long> apiHasDtoSet = new HashSet<>();
        //request
        Map<Long, List<BodyField>> inputHasDto = apiSpecInfoDto.getDocument().getRequest().getBody().getNestedDtos();
        for(Long inputHasDtoId : extractDtoIdFromUserInput(inputHasDto, apiSpec)){
            apiHasDtoSet.add(inputHasDtoId);
        }

        //response
        for(ResponseField responseObject : apiSpecInfoDto.getDocument().getResponse()){
            for(Long inputHasDtoId : extractDtoIdFromUserInput(responseObject.getBody().getNestedDtos(), apiSpec)){
                apiHasDtoSet.add(inputHasDtoId);
            }
        }

        for(Long apiSpecHasDtoId : apiHasDtoSet){
            Optional<DtoSpecEntity> dto = dtoSpecEntityRepository.findById(apiSpecHasDtoId);
            if(!dto.isPresent()){
                throw new CustomException(ErrorCode.DTO_NOT_FOUND);
            }
            apiHasDtoEntityRepository.save(
                    ApiHasDtoEntity.builder()
                            .apiSpecEntity(apiSpec)
                            .dtoSpecEntity(dto.get())
                            .build()
            );
        }

        //insert nosql
        apiSpecDocumentService.createApiSpec(apiSpec.getId(), apiSpecInfoDto.getDocument());

        return apiSpec.getId();
    }

    public List<Long> extractDtoIdFromUserInput(Map<Long, List<BodyField>> inputHasDto, ApiSpecEntity apiSpec){

        List<Long> inputInfoHasDto = new ArrayList<>();

        //nestedDto 가 없는 경우도 있다.
        if(inputHasDto == null){
            //pass
        }
        else if(inputHasDto!=null || inputHasDto.size() >0){
            for(Long dtoId : inputHasDto.keySet()){
                //dto 가 존재하지 않는 경우 쳐내기
                Optional<DtoSpecEntity> dto = dtoSpecEntityRepository.findById(dtoId);
                if(!dto.isPresent()) { throw new CustomException(ErrorCode.DTO_NOT_FOUND); }
                //depth 검증의 시간( 2 이상 쳐내기)
                if(!isDtoOverLimitDepth(dtoId, dto.get())){
                    throw new CustomException(ErrorCode.DTO_DEPTH_OVER);
                }
                //api가 가지고 있는 dto 정보 저장
                inputInfoHasDto.add(dtoId);
            }
        }

        return inputInfoHasDto;
    }

    public boolean isDtoOverLimitDepth(Long dtoId, DtoSpecEntity dto){

        //자식이 선을 넘은 경우부터 파악
        if(dto.isHasChild()){
            //부모도 자식도 가지고 있는 경우
            if(dto.isHasParent()){
                return false;
            }
            else{
                //부모가 없지만 슬하에 자식이 자식을 가진 경우를 검증해야함
                List<ChildDtoEntity> hasChildList = childDtoEntityRepository.findAllByDtoId(dtoId);
                for(ChildDtoEntity hasChildEntity : hasChildList){
                    if(hasChildEntity.getDtoSpecEntity().isHasChild()){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public DetailApiSpecInfoDto getApiSpec(Long apiId){
        Optional<ApiSpecEntity> apiSpec = apiSpecRepository.findById(apiId);
        ApiSpecDoc apiDoc = apiSpecDocumentService.getApiSpecDocs(apiId);

        if(!apiSpec.isPresent()){ throw new CustomException(ErrorCode.API_NOT_FOUND); }

        ResMemberDto memberDto = findApiSpecWriterByApiId(apiId);

        return
                DetailApiSpecInfoDto.builder()
                        .name(apiSpec.get().getName())
                        .description(apiSpec.get().getDescription())
                        .method(apiSpec.get().getMethod())
                        .status(apiSpec.get().getStatus())
                        .baseurlId(apiSpec.get().getBaseurlId())
                        .categoryId(apiSpec.get().getCategory().getId())
                        .member(memberDto)
                        .document(apiDoc)
                        .build();
    }

    public DetailApiInfoForTestDto getApiSpecDetail(Long apiId){

        Optional<ApiSpecEntity> apiSpec = apiSpecRepository.findById(apiId);
        ApiSpecDoc apiDoc = apiSpecDocumentService.getApiSpecDocs(apiId);
        log.info("getApiSpecDetailMethod find : " + apiDoc.toString());

        if(!apiSpec.isPresent()){ throw new CustomException(ErrorCode.API_NOT_FOUND); }

        //make header's list
        List<HeaderField> requestHeaderFields = new ArrayList<>();
        UtilMethods.emptyIfNull(apiDoc.getRequest().getHeaders()).forEach(value -> {
            requestHeaderFields.add(value.convertTo());
        });

        List<FieldInfo> requestPathVars = new ArrayList<>();
        UtilMethods.emptyIfNull(apiDoc.getRequest().getPathVars()).forEach(value ->{
            log.info("@@pathvars : " + value.toString());
            requestPathVars.add(value.convertTo());
        });

        List<FieldInfo> requestParams = new ArrayList<>();
        UtilMethods.emptyIfNull(apiDoc.getRequest().getParams()).forEach(value -> {
            log.info("@@params : " + value.toString());
            requestParams.add(value.convertTo());
        });

        //make request.body's list
        List<FieldInfo> bodyFields = new ArrayList<>();
        UtilMethods.emptyIfNull(apiDoc.getRequest().getBody().getFields()).forEach(value -> {
            bodyFields.add(value.convertTo());
        });

        Map<Long, List<ApiTestResultRequestNestedDto>> nestedDtos = new HashMap<>();
        Map<Long, List<ApiTestResultRequestNestedDtoList>> nestedDtoLists = new HashMap<>();


        //nestedDtos 는 null-check를 해야한다.
        if(apiDoc.getRequest().getBody().getNestedDtos() != null){
            for(Long dtoId : apiDoc.getRequest().getBody().getNestedDtos().keySet()){
                Map<Long, List<ApiTestResultRequestNestedDto>> forNestedDtos = new HashMap<>();
                Map<Long, List<ApiTestResultRequestNestedDtoList>> forNestedDtoLists = new HashMap<>();
                List<ApiTestResultRequestNestedDto> outerNestedDto = new ArrayList<>();

                DtoSpecEntity dtoSpecEntity = dtoSpecEntityService.getDtoSpecEntityById(dtoId);
                DtoInfo dtoSpecDoc =  dtoSpecDocumentService.findByDtoId(dtoId);

                // dtoId has objects
                apiDoc.getRequest().getBody().getNestedDtos().get(dtoId).forEach(value -> {

                    // dto in dto
                    if(dtoSpecDoc.getNestedDtos() != null){
                        dtoSpecDoc.getNestedDtos().forEach((docDtoKey, docDtoValue) -> {

                            DtoSpecEntity innerDtoSpecEntity = dtoSpecEntityService.getDtoSpecEntityById(docDtoKey);
                            DtoInfo innerDtoSpecDoc = dtoSpecDocumentService.findByDtoId(docDtoKey);

                            List<ApiTestResultRequestNestedDto> innerNestedDto = new ArrayList<>();

                            docDtoValue.forEach(innerValue -> {
                                if(innerValue.isItera()){
                                    // nestedDtoLists -> to be continue
                                }
                                else{
                                    innerNestedDto.add(
                                            ApiTestResultRequestNestedDto.builder()
                                                    .keyName(innerValue.getKeyName())
                                                    .name(innerDtoSpecEntity.getName())
                                                    .desc(innerDtoSpecEntity.getDescription())
                                                    .fields(innerDtoSpecDoc.getFields())
                                                    .nestedDtos(new HashMap<>())
                                                    .nestedDtoLists(new HashMap<>())
                                                    .build()
                                    );
                                }
                            });

                            if(innerNestedDto.size() >0) { forNestedDtos.put(docDtoKey, innerNestedDto); }

                        });
                    }


                    if(value.isItera()){
                        // nestedDtoLists -> to be continue
                    }
                    else{
                        outerNestedDto.add(
                            ApiTestResultRequestNestedDto.builder()
                                    .keyName(value.getKeyName())
                                    .name(dtoSpecEntity.getName())
                                    .desc(dtoSpecEntity.getDescription())
                                    .fields(dtoSpecDoc.getFields())
                                    .nestedDtos(forNestedDtos)
                                    .nestedDtoLists(forNestedDtoLists)
                                    .build()
                        );

                    }
                });

                if(outerNestedDto.size() >0 ){ nestedDtos.put(dtoId, outerNestedDto); }
            }
        }


        ApiTestResultRequestBody requestBody =
                ApiTestResultRequestBody.builder()
                        .fields(bodyFields)
                        .nestedDtos(nestedDtos)
                        .nestedDtoLists(nestedDtoLists)
                        .build();

        List<ApiTestResultResponseDoc> response = new ArrayList<>();
        //response 만들기
        UtilMethods.emptyIfNull(apiDoc.getResponse()).forEach(value -> {
            log.info(value.toString());

            List<HeaderField> responseHeaderFields = new ArrayList<>();

            UtilMethods.emptyIfNull(value.getHeaders()).forEach(header -> {
                responseHeaderFields.add(header.convertTo());
            });

            List<FieldInfo> responseBodyFields = new ArrayList<>();

            UtilMethods.emptyIfNull(value.getBody().getFields()).forEach(field -> {
                responseBodyFields.add(field.convertTo());
            });

            Map<Long, List<ApiTestResultRequestNestedDto>> responseNestedDtos = new HashMap<>();
            Map<Long, List<ApiTestResultRequestNestedDtoList>> responseNestedDtoLists = new HashMap<>();

            if(value.getBody().getNestedDtos()!= null){
                value.getBody().getNestedDtos().forEach((dtoId, dtoList) -> {

                    DtoSpecEntity targetDtoEntity = dtoSpecEntityService.getDtoSpecEntityById(dtoId);
                    DtoInfo targetDtoDoc = dtoSpecDocumentService.findByDtoId(dtoId);

                    List<ApiTestResultRequestNestedDto> newListByNestedDto = new ArrayList<>();
                    UtilMethods.emptyIfNull(dtoList).forEach(dtoInfo ->{
                        Map<Long, List<ApiTestResultRequestNestedDto>> innerNestedDtos = new HashMap<>();
                        Map<Long, List<ApiTestResultRequestNestedDtoList>> innerNestedDtoLists = new HashMap<>();

                        if(targetDtoDoc.getNestedDtos() != null){
                            targetDtoDoc.getNestedDtos().forEach((innerNestedDtoKey, innerNestedDtoValue) -> {

                                DtoSpecEntity innerDtoSpecEntity = dtoSpecEntityService.getDtoSpecEntityById(innerNestedDtoKey);
                                DtoInfo innerDtoDoc = dtoSpecDocumentService.findByDtoId(innerNestedDtoKey);

                                List<ApiTestResultRequestNestedDto> newListByInnerNestedDto = new ArrayList<>();

                                innerNestedDtoValue.forEach(innerValue -> {
                                    if(innerValue.isItera()){
                                        //for nestedDtoLists
                                    }
                                    else{
                                        newListByInnerNestedDto.add(
                                                ApiTestResultRequestNestedDto.builder()
                                                        .keyName(innerValue.getKeyName())
                                                        .name(innerDtoSpecEntity.getName())
                                                        .desc(innerValue.getDesc())
                                                        .fields(innerDtoDoc.getFields())
                                                        .nestedDtos(new HashMap<>())
                                                        .nestedDtoLists(new HashMap<>())
                                                        .build()
                                        );
                                    }
                                });

                                if(newListByInnerNestedDto.size() >0){
                                    innerNestedDtos.put(innerNestedDtoKey, newListByInnerNestedDto);
                                }

                            });
                        }

                        //nestedDtoLists
                        if(dtoInfo.isItera()){

                        }
                        else{
                            newListByNestedDto.add(
                                    ApiTestResultRequestNestedDto.builder()
                                            .keyName(dtoInfo.getKeyName())
                                            .name(targetDtoEntity.getName())
                                            .desc(dtoInfo.getDesc())
                                            .fields(targetDtoDoc.getFields())
                                            .nestedDtos(innerNestedDtos)
                                            .nestedDtoLists(innerNestedDtoLists)
                                            .build()
                            );
                        }
                    });

                    if(newListByNestedDto.size() > 0) { responseNestedDtos.put(dtoId, newListByNestedDto); }
                });
            }

            ApiTestForDetailResponseBody responseBody =
                    ApiTestForDetailResponseBody.builder()
                            .fields(responseBodyFields)
                            .nestedDtos(responseNestedDtos)
                            .nestedDtoLists(responseNestedDtoLists)
                            .build();

            response.add(
                ApiTestResultResponseDoc.builder()
                        .statusCode(value.getStatusCode())
                        .desc(value.getDesc())
                        .headers(responseHeaderFields)
                        .body(responseBody)
                        .build()
            );
        });

        DetailApiInfoDocument document =
                DetailApiInfoDocument.builder()
                        .request(
                                ApiTestResultRequest.builder()
                                        .additionalUrl(apiDoc.getRequest().getAdditionalUrl())
                                        .headers(requestHeaderFields)
                                        .pathVars(requestPathVars)
                                        .params(requestParams)
                                        .body(requestBody)
                                        .build()
                        )
                        .response(response)
                        .build();


        return
                DetailApiInfoForTestDto.builder()
                        .apiId(apiSpec.get().getId())
                        .baseurlId(apiSpec.get().getBaseurlId())
                        .categoryId(apiSpec.get().getCategory().getId())
                        .name(apiSpec.get().getName())
                        .status(apiSpec.get().getStatus())
                        .method(apiSpec.get().getMethod())
                        .description(apiSpec.get().getDescription())
                        .createdTime(apiSpec.get().getCreatedTime())
                        .member(apiSpec.get().getMember().toResDto())
                        .document(document)
                        .build();
    }

    public boolean changeApiStatus(ApiStatusDto apiStatusDto){

        Optional<ApiSpecEntity> apiSpecEntity = apiSpecRepository.findById(apiStatusDto.getApiId());
        if(!apiSpecEntity.isPresent()){
            throw new CustomException(ErrorCode.API_NOT_FOUND);
        }

        apiSpecRepository.save(
                ApiSpecEntity.builder()
                        .id(apiSpecEntity.get().getId())
                        .name(apiSpecEntity.get().getName())
                        .description(apiSpecEntity.get().getDescription())
                        .method(apiSpecEntity.get().getMethod())
                        .status(apiStatusDto.getStatus())
                        .baseurlId(apiSpecEntity.get().getBaseurlId())
                        .category(apiSpecEntity.get().getCategory())
                        .member(apiSpecEntity.get().getMember())
                        .createdTime(apiSpecEntity.get().getCreatedTime())
                        .build()
        );

        return true;
    }

//    public ApiSpecInfoDto updateApiSpec(Long apiId, Long memberId, ApiSpecInfoDto apiSpecInfoDto){
//        //mysql api table update
//        Optional<ApiSpecEntity> apiEntity = apiSpecRepository.findById(apiId);
//        if(!apiEntity.isPresent()){ throw new CustomException(ErrorCode.API_NOT_FOUND); }
//        apiSpecRepository.save(
//                ApiSpecEntity.builder()
//                        .id(apiEntity.get().getId())
//                        .name(apiSpecInfoDto.getName())
//                        .description(apiSpecInfoDto.getDesc())
//                        .method(apiSpecInfoDto.getMethod())
//                        .status(apiSpecInfoDto.getStatus())
//                        .baseurlId(apiSpecInfoDto.getBaseUrl())
//                        .category(categoryEntityRepository.findById(apiSpecInfoDto.getCategoryId()).get())
//                        .member(memberRepository.findById(memberId).get())
//                        .figmaSectionApiEntities(apiEntity.get().getFigmaSectionApiEntities())
//                        .build()
//        );
//
//        //update 된 내용 받아올라나 싶어서 일단 해둠
//        apiEntity = apiSpecRepository.findById(apiId);
//
//        //mysql api has dto table remove
//        for(ApiHasDtoEntity apiHasDto : apiHasDtoEntityRepository.findAllByApiSpecEntity(apiEntity.get())){
//            apiHasDtoEntityRepository.delete(apiHasDto);
//        }
//        //mysql api has dto table update
//        for(Map.Entry<Long, DtoInfo> entry : apiSpecInfoDto.getDocument().getRequest().getBody().getNestedDtos().entrySet()){
//            Long key = entry.getKey();
//            DtoInfo value = entry.getValue();
//
//            for(Long childKey : value.getNestedDtos().keySet()){
//                Optional<DtoSpecEntity> dtoSpec = dtoSpecEntityRepository.findById(childKey);
//                if(!dtoSpec.isPresent()){
//                    throw new CustomException(ErrorCode.DTO_NOT_FOUND);
//                }
//                apiHasDtoEntityRepository.save(
//                        ApiHasDtoEntity.builder()
//                                .apiSpecEntity(apiEntity.get())
//                                .dtoSpecEntity(dtoSpec.get())
//                                .build()
//                );
//            }
//
//            Optional<DtoSpecEntity> dtoSpec = dtoSpecEntityRepository.findById(key);
//            if(!dtoSpec.isPresent()){ throw new CustomException(ErrorCode.DTO_NOT_FOUND); }
//
//            apiHasDtoEntityRepository.save(
//                    ApiHasDtoEntity.builder()
//                            .apiSpecEntity(apiEntity.get())
//                            .dtoSpecEntity(dtoSpec.get())
//                            .build()
//            );
//        }
//        //mongodb collection update
//        apiSpecDocumentService.updateApiSpec(apiId, apiSpecInfoDto.getDocument());
//
//        return
//                ApiSpecInfoDto.builder()
//                        .name(apiEntity.get().getName())
//                        .desc(apiEntity.get().getDescription())
//                        .method(apiEntity.get().getMethod())
//                        .baseUrl(apiEntity.get().getBaseurlId())
//                        .categoryId(apiEntity.get().getCategory().getId())
//                        .status(apiEntity.get().getStatus())
//                        .document(apiSpecDocumentService.getApiSpecDocs(apiId))
//                        .build();
//    }

    public void deleteApiSpec(Long apiId){
        //mysql entity update
        Optional<ApiSpecEntity> apiSpec = apiSpecRepository.findById(apiId);
        if(!apiSpec.isPresent()){
            throw new CustomException(ErrorCode.API_NOT_FOUND);
        }
        apiSpecRepository.delete(apiSpec.get());

        //mongodb drop document
        apiSpecDocumentService.deleteApiSpec(apiId);
    }

    public ResMemberDto findApiSpecWriterByApiId(Long apiId){
        Optional<ApiSpecEntity> apiSpec = apiSpecRepository.findById(apiId);
        if(!apiSpec.isPresent()){
            throw new CustomException(ErrorCode.API_NOT_FOUND);
        }
        ApiSpecEntity apiSpecEntity = apiSpec.get();

        return ResMemberDto.builder()
                .id(apiSpecEntity.getMember().getId())
                .name(apiSpecEntity.getMember().getName())
                .email(apiSpecEntity.getMember().getEmail())
                .profileImg(apiSpecEntity.getMember().getProfileImg())
                .build();


    }
}
