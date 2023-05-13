package com.rocket.ssafast.apispec.repository;

import java.util.Map;
import java.util.Optional;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.rocket.ssafast.apispec.domain.Document.ApiTestResultDocument;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApiTestResultDocRepository {

	private final MongoTemplate mongoTemplate;

	public ApiTestResultDocument save(ApiTestResultDocument entity) {
		return mongoTemplate.save(entity);
	}

	public Optional<ApiTestResultDocument> findById(String id) {
		Query query = new Query(Criteria.where("_id").is(id));
		return Optional.ofNullable(mongoTemplate.findOne(query, ApiTestResultDocument.class));
	}

	public Map<String, Object> findResultsByIdAndKey(String id, long resId) {
		Query query = Query.query(
			Criteria.where("_id").is(id)
				.and("results." + resId).exists(true));
		Document doc = mongoTemplate.findOne(query, Document.class, "api_test_result_docs");
		Map<String, Object> results = (Map<String, Object>) doc.get("results");
		return (Map<String, Object>) results.get(Long.toString(resId));
	}
}
