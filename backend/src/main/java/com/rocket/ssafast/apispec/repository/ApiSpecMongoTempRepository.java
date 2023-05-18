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

import com.rocket.ssafast.apispec.domain.Document.ApiSpecDocument;
import com.rocket.ssafast.apispec.domain.Document.element.ApiDoc;
import com.rocket.ssafast.apispec.domain.Document.element.ResponseDoc;
import com.rocket.ssafast.apispec.domain.Document.temp.ResponseField;
import com.rocket.ssafast.usecase.dto.response.ResUsecasePrevResponseDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApiSpecMongoTempRepository {

	private final MongoTemplate mongoTemplate;

	public List<ResUsecasePrevResponseDto> findApiResponseListByIdAndApiIdLIst(String id, List<Long> apiIds) {

		// 1. collection에서 api의 spec 정보 가져오기
		Query query = Query.query(Criteria.where("_id").is(id));
		ApiSpecDocument document = mongoTemplate.findOne(query, ApiSpecDocument.class,"SSAFAST_API_SPEC");

		// 2. 최종 리턴될 객체
		List<ResUsecasePrevResponseDto> prevResponseDtos = new ArrayList<>();

		document.getApis().forEach((apiId, apiSpecDoc) -> {
			if(apiIds.contains(apiId)){
				ResponseField response = apiSpecDoc.getResponse().stream()
					.filter(res -> res.getStatusCode() == 200)
					.findFirst()
					.get();
				prevResponseDtos.add(ResUsecasePrevResponseDto.builder()
					.apiId(apiId)
					.headers(response.getHeaders())
					.build());
			}
		});

		return prevResponseDtos;
	}
}
