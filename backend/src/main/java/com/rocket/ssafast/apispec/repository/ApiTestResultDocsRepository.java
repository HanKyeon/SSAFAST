package com.rocket.ssafast.apispec.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.rocket.ssafast.apispec.domain.Document.ApiTestResultDocument;

public interface ApiTestResultDocsRepository extends MongoRepository<ApiTestResultDocument, String> {
}
