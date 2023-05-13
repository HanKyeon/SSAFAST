package com.rocket.ssafast.apispec.service;

import com.rocket.ssafast.apispec.domain.Document.ApiSpecDocument;
import com.rocket.ssafast.apispec.domain.Document.element.ApiDoc;
import com.rocket.ssafast.apispec.repository.ApiSpecDocRepository;
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


    public ApiDoc getApiSpecDocs(Long apiId){
        ApiSpecDocument document = createOrFindApiSpecsIfExists();
        ApiDoc target = document.getApis().get(apiId);
        return target;
    }

    public ApiDoc createApiSpec(Long apiId, ApiDoc apiSpec){
        ApiSpecDocument document = createOrFindApiSpecsIfExists();
        document.getApis().put(apiId, apiSpec);
        apiSpecDocRepository.save(document);
        return document.getApis().get(apiId);
    }

    public ApiSpecDocument createOrFindApiSpecsIfExists(){
        Optional<ApiSpecDocument> document = apiSpecDocRepository.findById(SSAFAST_API_SPEC_ID);
        if(document.isPresent()){ return document.get(); }
        return new ApiSpecDocument(SSAFAST_API_SPEC_ID, new HashMap<>());
    }
}
