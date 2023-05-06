package com.rocket.ssafast.apispec.service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rocket.ssafast.apispec.domain.Document.ApiTestResultDocument;
import com.rocket.ssafast.apispec.domain.Document.element.ApiTestResultInfo;
import com.rocket.ssafast.apispec.domain.Entity.ApiTestResultEntity;
import com.rocket.ssafast.apispec.domain.Enum.HTTPMethod;
import com.rocket.ssafast.apispec.dto.request.ApiExecReqMessageDto;
import com.rocket.ssafast.apispec.dto.request.ApiTestResultDto;
import com.rocket.ssafast.apispec.dto.response.ApiTestResultSummaryDto;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.repository.ApiTestResultDocsRepository;
import com.rocket.ssafast.apispec.repository.ApiTestResultEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApiExecService {

	@Value("${mongoid.document.test}")
	private String SSAFAST_TEST_ID;
	private static final RestTemplate restTemplate;
	private final ApiTestResultDocsRepository apiTestResultDocsRepository;
	private final ApiTestResultEntityRepository apiTestResultEntityRepository;
	private final ApiSpecRepository apiSpecRepository;

	public ResponseEntity<?> requestAPI(ApiExecReqMessageDto apiExecReqMessageDto) throws JsonProcessingException {

		if(HTTPMethod.getMethodByNumber(apiExecReqMessageDto.getMethod()) == null) {
			throw new CustomException(ErrorCode.HTTPMETHOD_NOT_FOUND);
		}

		// 1. Headers 셋팅
		HttpHeaders headers = new HttpHeaders();
		Map<String, String> reqHeaders = apiExecReqMessageDto.getHeaders();

		if(reqHeaders != null) {
			reqHeaders.forEach( (key, value) -> {
				headers.set(key, value);
			});
		}

		// 2. URL에 Path Variable 셋팅
		Map<String, String> reqPathVars = apiExecReqMessageDto.getPathVars();
		StringBuilder sb = new StringBuilder();

		String[] splitedUrl = apiExecReqMessageDto.getUrl().split("/");

		for(String urlWord : splitedUrl) {

			if(urlWord.length() > 0 && urlWord.charAt(0) == ':' &&
				(urlWord.charAt(0) == '-' || Character.isAlphabetic(urlWord.charAt(1)))) {

				if(reqPathVars == null || urlWord.split(":")[0] == null) {
					throw new CustomException(ErrorCode.BAD_REQUEST);
				}
				sb.append(reqPathVars.get(urlWord.split(":")[1])+"/");
			}
			else {
				sb.append(urlWord+"/");
			}
		}
		sb.deleteCharAt(sb.lastIndexOf("/"));

		// 3. params 셋팅
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		if(apiExecReqMessageDto.getParams() != null) {
			apiExecReqMessageDto.getParams().forEach((key, value) -> {
				params.add(key, value);
			});
		}
		// 4. 최종 URI 셋팅
		UriComponents uri = UriComponentsBuilder.fromHttpUrl(sb.toString())
			.queryParams(params)
			.build();

		// 5. header, body를 entity에 담기
		HttpEntity<?> entity;
		if (apiExecReqMessageDto.getBody() == null) {
			entity = new HttpEntity<>(headers);
		} else {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, Object> requestBodyMap = objectMapper.readValue(apiExecReqMessageDto.getBody(), new TypeReference<Map<String, Object>>() {});
			String requestBodyJson = objectMapper.writeValueAsString(requestBodyMap);
			entity = new HttpEntity<>(requestBodyJson, headers);
		}

		// 6. API 요청
		try {
			return restTemplate.exchange(
				uri.toUriString(),
				HTTPMethod.getMethodByNumber(apiExecReqMessageDto.getMethod()),
				entity,
				new ParameterizedTypeReference<Object>() {});
		} catch (Exception e) {
			throw new RuntimeException("CLIENT_ERROR", e);
		}
	}

	@Transactional
	public void saveApiTestResult(ApiTestResultDto apiTestResultDto) {
		if(apiTestResultDto.getName() == null || apiTestResultDto.getMember() == null || apiTestResultDto.getApiInfoId() == null) {
			throw new CustomException(ErrorCode.BAD_REQUEST);
		}

		long resultId = apiTestResultEntityRepository.save(apiTestResultDto.toEntity()).getId();

		ApiTestResultDocument document = createOrFinResultsIfExists();
		document.getResults().put(resultId, apiTestResultDto.toInfo());

		apiTestResultDocsRepository.save(document);
	}


	public ApiTestResultDocument createOrFinResultsIfExists(){
		Optional<ApiTestResultDocument> document = apiTestResultDocsRepository.findById(SSAFAST_TEST_ID);

		if(document.isPresent()) { return document.get(); }

		return new ApiTestResultDocument(SSAFAST_TEST_ID, new HashMap<>());
	}

	public List<ApiTestResultSummaryDto> getAPIExecResults(long apiId) {
		if(!apiSpecRepository.findById(apiId).isPresent()) {
			throw new CustomException(ErrorCode.API_NOT_FOUND);
		}

		List<ApiTestResultSummaryDto> results = new ArrayList<>();

		List<ApiTestResultEntity> entities = apiTestResultEntityRepository.findAllByApiInfoId(apiId);
		for(ApiTestResultEntity entity : entities) {
			results.add(entity.toSummaryDto());
		}
		return results;
	}

	public Map<String, Object> getAPIExecDetailResult(long resId) {
		if(!apiTestResultEntityRepository.findById(resId).isPresent()) {
			throw new CustomException(ErrorCode.API_NOT_FOUND);
		}

		Map<String, Object> detailResult = apiTestResultDocsRepository.findResultsByIdAndKey(SSAFAST_TEST_ID, resId);
		if(detailResult == null) {
			throw new CustomException(ErrorCode.DETAIL_RESULT_NOT_FOUND);
		}
		return detailResult;
	}

	static {
		// 참고로 Patch Method 를 쓰기 위해서는
		// HttpComponentsClientHttpRequestFactory를 사용해야 한다!
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();

		factory.setConnectTimeout(5000);
		factory.setReadTimeout(5000);
		factory.setBufferRequestBody(false);

		restTemplate = new RestTemplate(factory);
		restTemplate.getMessageConverters()
			.add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
		// Response 한글 깨짐 방지
	}
}
