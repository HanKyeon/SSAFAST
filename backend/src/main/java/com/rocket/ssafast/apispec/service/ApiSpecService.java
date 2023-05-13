package com.rocket.ssafast.apispec.service;

import com.rocket.ssafast.apispec.domain.Document.element.ApiDoc;
import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apispec.domain.Entity.CategoryEntity;
import com.rocket.ssafast.apispec.dto.request.ApiSpecInfoDto;
import com.rocket.ssafast.apispec.dto.response.DetailApiSpecInfoDto;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.repository.CategoryEntityRepository;
import com.rocket.ssafast.dtospec.domain.ApiHasDtoEntity;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.repository.ApiHasDtoEntityRepository;
import com.rocket.ssafast.dtospec.repository.DtoSpecEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.member.domain.Member;
import com.rocket.ssafast.member.dto.response.ResMemberDto;
import com.rocket.ssafast.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
                        .description(apiSpecInfoDto.getDesc())
                        .method(apiSpecInfoDto.getMethod())
                        .status(apiSpecInfoDto.getStatus())
                        .baseurlId(apiSpecInfoDto.getBaseUrl())
                        .category(category.get())
                        .member(member.get())
                        .build()
        );

        //update api has dto table
        Map<Long, DtoInfo> inputHasDto = apiSpecInfoDto.getDocument().getRequest().getBody().getNestedDtos();
        if(inputHasDto!=null || inputHasDto.size() >0){
            for(Long dtoId : inputHasDto.keySet()){
                Optional<DtoSpecEntity> dto = dtoSpecEntityRepository.findById(dtoId);
                if(!dto.isPresent()) { throw new CustomException(ErrorCode.DTO_NOT_FOUND); }
                apiHasDtoEntityRepository.save(
                        ApiHasDtoEntity.builder()
                                .apiSpecEntity(apiSpec)
                                .dtoSpecEntity(dto.get())
                                .build()
                );
            }
        }

        //insert nosql
        apiSpecDocumentService.createApiSpec(apiSpec.getId(), apiSpecInfoDto.getDocument());

        return apiSpec.getId();
    }

    public DetailApiSpecInfoDto getApiSpecDetail(Long apiId, ResMemberDto memberDto){
        Optional<ApiSpecEntity> apiSpec = apiSpecRepository.findById(apiId);
        ApiDoc apiDoc = apiSpecDocumentService.getApiSpecDocs(apiId);

        if(!apiSpec.isPresent()){ throw new CustomException(ErrorCode.API_NOT_FOUND); }
        ApiSpecEntity presentApiSpec = apiSpec.get();

        //nestedDto 안에서 itera 속성이 true인 애들 추출
        Map<Long, DtoInfo> nestedDtos = new HashMap<>();
        Map<Long, DtoInfo> nestedDtoList = new HashMap<>();
        for(Map.Entry<Long, DtoInfo> entry : apiDoc.getRequest().getBody().getNestedDtos().entrySet()){
            Long key = entry.getKey();
            DtoInfo value = entry.getValue();
            if(value.isItera()){
                nestedDtoList.put(key, value);
            }
            else{
                nestedDtos.put(key, value);
            }
        }

        apiDoc.getRequest().getBody().setNestedDtos(nestedDtos);
        apiDoc.getRequest().getBody().setNestedDtoList(nestedDtoList);

        return DetailApiSpecInfoDto.builder()
                .apiId(apiId)
                .name(presentApiSpec.getName())
                .description(presentApiSpec.getDescription())
                .method(presentApiSpec.getMethod())
                .status(presentApiSpec.getStatus())
                .baseurlId(presentApiSpec.getBaseurlId())
                .categoryId(presentApiSpec.getCategory().getId())
                .member(memberDto)
                .createdTime(presentApiSpec.getCreatedTime())
                .document(apiDoc)
                .build();
    }
}
