package com.rocket.ssafast.usecase.repository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.rocket.ssafast.usecase.domain.document.UsecaseDocument;
import com.rocket.ssafast.usecase.domain.document.element.UsecaseInfo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UsecaseTestDocsRepository {

	private final MongoTemplate mongoTemplate;

	public UsecaseDocument save(UsecaseDocument document) {
		return mongoTemplate.save(document);
	}

	public UsecaseDocument findById(String id) {
		Query query = new Query(Criteria.where("_id").is(id));
		return mongoTemplate.findOne(query, UsecaseDocument.class);
	}

	public UsecaseInfo findTestById(String id, long usecaseTestId) {
		Query query = Query.query(Criteria.where("_id").is(id));

		UsecaseDocument doc = mongoTemplate.findOne(query, UsecaseDocument.class, "usecase_test_docs");

		System.out.println(doc);
		return doc.getUsecaseTest().get(usecaseTestId);
	}
}
