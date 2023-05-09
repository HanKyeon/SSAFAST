package com.rocket.ssafast.apispec.service;

import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apispec.domain.Entity.CategoryEntity;
import com.rocket.ssafast.apispec.domain.Entity.FigmaSectionApi;
import com.rocket.ssafast.apispec.dto.response.ApiCategoryDto;
import com.rocket.ssafast.apispec.dto.response.ApiCategoryListDto;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.repository.CategoryEntityRepository;
import com.rocket.ssafast.apispec.repository.FigmaSectionApiRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.figma.repository.FigmaSectionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class FigmaSectionApiService {

    private final FigmaSectionApiRepository figmaSectionApiRepository;
    private final ApiSpecRepository apiSpecRepository;
    private final FigmaSectionRepository figmaSectionRepository;
    private final CategoryEntityRepository categoryEntityRepository;

    @Transactional
    public void createApiFigmaSection(Long figmaSectionId, List<Long> apiIds) {
        if(!figmaSectionRepository.existsById(figmaSectionId)){
            throw new CustomException(ErrorCode.SECTION_NOT_FOUND);
        }

        if(!figmaSectionApiRepository.existsByFigmaSectionId(figmaSectionId)){
            figmaSectionApiRepository.deleteAllByFigmaSectionId(figmaSectionId);
        }

        for(Long apiId : apiIds){
            Optional<ApiSpecEntity> apiSpecEntityOptional = apiSpecRepository.findById(apiId);

            if(!apiSpecEntityOptional.isPresent()){
                throw new CustomException(ErrorCode.API_NOT_FOUND);
            }

            figmaSectionApiRepository.save(FigmaSectionApi.builder()
                    .apiInfoId(apiId)
                    .figmaSectionId(figmaSectionId).build());
        }
    }

    @Transactional
    public ApiCategoryListDto getApiFigmaSection(Long figmaSectionId) {
        if(!figmaSectionRepository.existsById(figmaSectionId)){
            throw new CustomException(ErrorCode.SECTION_NOT_FOUND);
        }
        List<FigmaSectionApi> apis = figmaSectionApiRepository.findByFigmaSectionId(figmaSectionId);

        HashMap<Long, List<ApiSpecEntity>> map = new HashMap<>();
        for(FigmaSectionApi figmaSectionApi : apis){
            ApiSpecEntity apiSpecEntity = apiSpecRepository.findById(figmaSectionApi.getApiInfoId()).get();
            Long categoryId = apiSpecEntity.getCategory().getId();
            if(!map.containsKey(categoryId)){
                map.put(categoryId, new ArrayList<>());
            }
            map.get(categoryId).add(apiSpecEntity);
        }

        List<ApiCategoryDto> apiCategoryDtos = new ArrayList<>();
        for(Map.Entry<Long, List<ApiSpecEntity>> entry : map.entrySet()){
            List<ApiSpecEntity> apiSpecEntities = entry.getValue();

            ApiCategoryDto apiCategoryDto = new ApiCategoryDto();
            apiCategoryDto.setCategoryId(entry.getKey());
            apiCategoryDto.setCategoryName(apiSpecEntities.get(0).getCategory().getName());

            for(ApiSpecEntity apiSpecEntity : apiSpecEntities){
                apiCategoryDto.getApis().add(apiSpecEntity.toDto());
            }
            apiCategoryDtos.add(apiCategoryDto);
        }
        return ApiCategoryListDto.builder().apiCategories(apiCategoryDtos).build();
    }

    @Transactional
    public void deleteApiFigmaSection(Long figmaSectionId) {
        if(!figmaSectionRepository.existsById(figmaSectionId)){
            throw new CustomException(ErrorCode.SECTION_NOT_FOUND);
        }

        figmaSectionRepository.deleteById(figmaSectionId);
    }
}
