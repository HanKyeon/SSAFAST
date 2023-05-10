package com.rocket.ssafast.usecase.repository;

import java.util.Map;
import java.util.Optional;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.rocket.ssafast.usecase.domain.UsecaseTestDocument;
import com.rocket.ssafast.usecase.domain.element.UsecaseTestInfo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UsecaseTestDocsRepository {

	private final MongoTemplate mongoTemplate;

	public UsecaseTestDocument save(UsecaseTestDocument document) {
		return mongoTemplate.save(document);
	}

	public UsecaseTestInfo findTestById(String id, long usecaseTestId) {
		Query query = Query.query(
			Criteria.where("_id").is(id)
				.and("usecaseTest." + usecaseTestId).exists(true));
		Document doc = mongoTemplate.findOne(query, Document.class, "usecase_test_docs");
		return ((Map<String, UsecaseTestInfo>) doc.get("usecaseTest")).get(usecaseTestId);
	}

	// public Optional<UsecaseTestDocument> findById(String id, String usecaseTestid) {
	// 	Query query = new Query(Criteria.where("_id").is(id));
	// 	return Optional.ofNullable(mongoTemplate.findOne(query, UsecaseTestDocument.class));
	// }
	/*
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
