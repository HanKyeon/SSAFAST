package com.rocket.ssafast.apispec.service;

import com.rocket.ssafast.apispec.domain.Entity.CategoryEntity;
import com.rocket.ssafast.apispec.dto.response.BaseurlsDto;
import com.rocket.ssafast.apispec.dto.response.CategoryDto;
import com.rocket.ssafast.apispec.dto.response.CategoryListDto;
import com.rocket.ssafast.apispec.repository.CategoryEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.workspace.domain.Baseurl;
import com.rocket.ssafast.workspace.dto.response.BaseurlDto;
import com.rocket.ssafast.workspace.repository.BaseurlRepository;
import com.rocket.ssafast.workspace.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiPreService {

    private final BaseurlRepository baseurlRepository;
    private final CategoryEntityRepository categoryEntityRepository;
    private final WorkspaceRepository workspaceRepository;
    @Transactional
    public BaseurlsDto getBaseurls(Long workspaceId){
        //workspaceid로 baseurl가져오기
        List<Baseurl> baseurls = baseurlRepository.findAllByWorkspaceId(workspaceId);
        if(baseurls.size() == 0 ){
            throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
        }
        List<BaseurlDto> baseurlDtos = new ArrayList<>();
        for(Baseurl baseurl : baseurls){
            baseurlDtos.add(BaseurlDto.builder()
                    .id(baseurl.getId())
                    .url(baseurl.getUrl()).build()
            );
        }

        return BaseurlsDto.builder()
                .baseurls(baseurlDtos).build();
    }

    public CategoryDto createCategory(Long workspaceId, String name) {
        if(!categoryEntityRepository.findByWorkspaceIdAndName(workspaceId, name).isPresent()){
            throw new CustomException(ErrorCode.DUPLICATE);
        }

        CategoryEntity savedCategory = categoryEntityRepository.save(CategoryEntity.builder()
                .name(name)
                .workspace(workspaceRepository.findById(workspaceId).get())
                .build());

        Long savedId = savedCategory.getId();
        String savedName = savedCategory.getName();

        return CategoryDto.builder().id(savedId)
                .name(savedName).build();
    }

    public CategoryDto updateCategory(Long workspaceId, Long categoryId, String name) {
        //기존 category 조회
        List<CategoryEntity> sameNames = categoryEntityRepository.findAllByWorkspaceIdAndName(workspaceId,name);
        //중복된 카테고리 존재하는지 조회
        for(CategoryEntity category : sameNames){
            if(!category.getId().equals(name)){
                throw new CustomException(ErrorCode.DUPLICATE);
            }
        }

        Optional<CategoryEntity> updateCategoryOptional = categoryEntityRepository.findById(categoryId);

        //조회 결과 없으면 bad request
        if(!updateCategoryOptional.isPresent()){
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        CategoryEntity updateCategory = updateCategoryOptional.get();
        updateCategory.updateName(name);
        return categoryEntityRepository.save(updateCategory).toDto();
    }

    public CategoryListDto getCategoryList(Long workspaceId) {
        List<CategoryEntity> categoryEntities = categoryEntityRepository.findAllByWorkspaceId(workspaceId);

        List<CategoryDto> categoryDtos = new ArrayList<>();
        for(CategoryEntity categoryEntity : categoryEntities){
            categoryDtos.add(CategoryDto.builder()
                    .id(categoryEntity.getId())
                    .name(categoryEntity.getName())
                    .build());
        }

        return CategoryListDto.builder()
                .categorys(categoryDtos).build();
    }
}
