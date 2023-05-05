package com.rocket.ssafast.apispec.service;

import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apispec.domain.Entity.FigmaSectionApiEntity;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.repository.FigmaSectionApiRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.figma.repository.FigmaSectionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FigmaSectionApiService {

    private final FigmaSectionApiRepository figmaSectionApiRepository;
    private final ApiSpecRepository apiSpecRepository;
    private final FigmaSectionRepository figmaSectionRepository;

    @Transactional
    public void createApiFigmaSection(Long figmaSectionId, List<Long> apiIds) {
        log.info(apiIds.toString());
        if(!figmaSectionRepository.existsById(figmaSectionId)){
            throw new CustomException(ErrorCode.SECTION_NOT_FOUND);
        }

        for(Long apiId : apiIds){
            Optional<ApiSpecEntity> apiSpecEntityOptional = apiSpecRepository.findById(apiId);

            if(!apiSpecEntityOptional.isPresent()){
                throw new CustomException(ErrorCode.API_NOT_FOUND);
            }

            figmaSectionApiRepository.save(FigmaSectionApiEntity.builder()
                    .apiSpecEntity(apiSpecEntityOptional.get())
                    .figmaSectionId(figmaSectionId).build());
        }
    }

    @Transactional
    public Object getApiFigmaSecton(Long figmaSectionId, int method, String name) {
        return "";
    }

    @Transactional
    public void deleteApiFigmaSection(Long figmaSectionId) {
        if(!figmaSectionRepository.existsById(figmaSectionId)){
            throw new CustomException(ErrorCode.SECTION_NOT_FOUND);
        }

        figmaSectionRepository.deleteById(figmaSectionId);
    }
}
