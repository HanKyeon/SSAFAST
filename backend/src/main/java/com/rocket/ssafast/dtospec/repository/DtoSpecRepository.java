package com.rocket.ssafast.dtospec.repository;

import com.rocket.ssafast.dtospec.domain.DtoSpecDocument;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DtoSpecRepository extends MongoRepository<DtoSpecDocument, Long> {

}