package com.rocket.ssafast.dtospec.repository;

import com.rocket.ssafast.dtospec.domain.DtoSpecDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DtoSpecDocumentRepository extends MongoRepository<DtoSpecDocument, Long> {
}
