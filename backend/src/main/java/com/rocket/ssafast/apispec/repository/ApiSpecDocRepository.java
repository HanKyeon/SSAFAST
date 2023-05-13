package com.rocket.ssafast.apispec.repository;

import com.rocket.ssafast.apispec.domain.Document.ApiSpecDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApiSpecDocRepository extends MongoRepository<ApiSpecDocument, String> {
}
