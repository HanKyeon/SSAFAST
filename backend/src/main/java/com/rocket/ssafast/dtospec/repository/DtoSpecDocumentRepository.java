package com.rocket.ssafast.dtospec.repository;

import com.rocket.ssafast.dtospec.domain.DtoSpecDocument;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface DtoSpecDocumentRepository extends MongoRepository<DtoSpecDocument, String> {
}
