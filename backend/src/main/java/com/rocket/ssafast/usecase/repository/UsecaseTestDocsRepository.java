package com.rocket.ssafast.usecase.repository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.rocket.ssafast.usecase.domain.UsecaseTestDocument;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UsecaseTestDocsRepository {

	private final MongoTemplate mongoTemplate;

	public UsecaseTestDocument save(UsecaseTestDocument document) {
		return mongoTemplate.save(document);
	}


	/*
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
	 */
}
