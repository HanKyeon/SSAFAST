package com.rocket.ssafast.apispec.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.rocket.ssafast.apispec.domain.Document.element.ApiDoc;
import com.rocket.ssafast.apispec.domain.Document.element.ResponseDoc;
import com.rocket.ssafast.usecase.dto.response.ResUsecasePrevResponseDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApiSpecMongoTempRepository {

	private final MongoTemplate mongoTemplate;

	public List<ResUsecasePrevResponseDto> findApiResponseListByIdAndApiIdLIst(String id, List<Long> apiIds) {
		
		// 1. collection에서 api의 spec 정보 가져오기
		Query query = Query.query(Criteria.where("_id").is(id));

		Document doc = mongoTemplate.findOne(query, Document.class,"SSAFAST_API_SPEC");

		System.out.println("doc: "+doc);
		Map<Long, ApiDoc> apis = (Map<Long, ApiDoc>)(
			(Map<Long, ApiDoc>) doc.get("apis")).entrySet().stream()
			.filter( apiDocEntry -> apiIds.contains(apiDocEntry.getKey()));

		
		// 2. 최종 리턴될 객체
		List<ResUsecasePrevResponseDto> prevResponseDtos = new ArrayList<>();


		// 3. 리턴될 객체에 데이터 삽입
		apis.forEach((apiId, apiDoc) -> {

			// api의 spec의 response 중 status가 200인 response 명세 가져오기
			ResponseDoc responseDoc = apiDoc.getResponse().stream()
				.filter(resDoc -> resDoc.getStatusCode() == 200)
				.collect(Collectors.toList()).get(0);

			// response의 headers와 body 정보만 삽입
			prevResponseDtos.add(
				ResUsecasePrevResponseDto.builder()
					.apiId(apiId)
					.headers(responseDoc.getHeaders())
					.body(responseDoc.getBody())
					.build()
			);
		});

		return prevResponseDtos;
	}
}
