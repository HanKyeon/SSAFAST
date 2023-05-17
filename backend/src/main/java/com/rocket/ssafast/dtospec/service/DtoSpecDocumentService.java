package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.dtospec.domain.DtoSpecDocument;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.repository.DtoSpecDocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class DtoSpecDocumentService {

    private final DtoSpecDocumentRepository dtoSpecDocumentRepository;

    @Value("${mongoid.document.dto}")
    private String SSAFAST_DTO_ID;

    public DtoInfo findByDtoId(Long dtoId){
        DtoSpecDocument document = createOrFindDtosIfExists();
        DtoInfo dtoInfo = document.getDtos().get(dtoId);
        log.debug("test : ", dtoInfo.toString());
        return dtoInfo;
    }

    public DtoSpecDocument createOrUpdateDtoDocs(Long dtoEntityId, DtoInfo dtoInfo){
        DtoSpecDocument document = createOrFindDtosIfExists();
        document.getDtos().put(dtoEntityId, dtoInfo);
        return dtoSpecDocumentRepository.save(document).toDto();
    }

    public DtoSpecDocument createOrFindDtosIfExists(){
        Optional<DtoSpecDocument> document = dtoSpecDocumentRepository.findById(SSAFAST_DTO_ID);

        if(document.isPresent()) { return document.get(); }

        return new DtoSpecDocument(SSAFAST_DTO_ID, new HashMap<>());
    }

    public boolean deleteDtoDocs(Long dtoId){
        DtoSpecDocument document = createOrFindDtosIfExists();
        document.getDtos().remove(dtoId);
        return true;
    }



}
