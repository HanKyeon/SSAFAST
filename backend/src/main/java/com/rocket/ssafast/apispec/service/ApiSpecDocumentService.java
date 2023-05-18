package com.rocket.ssafast.apispec.service;

import com.rocket.ssafast.apispec.domain.Document.ApiSpecDocument;
import com.rocket.ssafast.apispec.domain.Document.temp.ApiSpecDoc;
import com.rocket.ssafast.apispec.repository.ApiSpecDocRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ApiSpecDocumentService {
    @Value("${mongoid.document.api}")
    private String SSAFAST_API_SPEC_ID;

    private final ApiSpecDocRepository apiSpecDocRepository;


    public ApiSpecDoc getApiSpecDocs(Long apiId){
        ApiSpecDocument document = createOrFindApiSpecsIfExists();
        ApiSpecDoc target = document.getApis().get(apiId);
        if(target == null){
            throw new CustomException(ErrorCode.API_NOT_FOUND);
        }
        return target;
    }

    public ApiSpecDoc createApiSpec(Long apiId, ApiSpecDoc apiSpec){
        ApiSpecDocument document = createOrFindApiSpecsIfExists();
        document.getApis().put(apiId, apiSpec);
        apiSpecDocRepository.save(document);
        return document.getApis().get(apiId);
    }

    public ApiSpecDoc updateApiSpec(Long apiId, ApiSpecDoc apiSpec){
        ApiSpecDocument document = createOrFindApiSpecsIfExists();
        document.getApis().put(apiId, apiSpec);
        apiSpecDocRepository.save(document);
        return getApiSpecDocs(apiId);
    }

    public boolean deleteApiSpec(Long apiId){
        ApiSpecDocument document = createOrFindApiSpecsIfExists();
        if(!document.getApis().containsKey(apiId)){
            throw new CustomException(ErrorCode.API_NOT_FOUND);
        }
        document.getApis().remove(apiId);
        apiSpecDocRepository.save(document);
        return true;
    }

    public ApiSpecDocument createOrFindApiSpecsIfExists(){
        Optional<ApiSpecDocument> document = apiSpecDocRepository.findById(SSAFAST_API_SPEC_ID);
        if(document.isPresent()){ return document.get(); }
        return new ApiSpecDocument(SSAFAST_API_SPEC_ID, new HashMap<>());
    }
}
