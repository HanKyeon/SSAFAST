package com.rocket.ssafast.apispec.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rocket.ssafast.apispec.domain.Document.ApiTestResultDocument;
import com.rocket.ssafast.apispec.domain.Entity.ApiTestResultEntity;
import com.rocket.ssafast.apispec.domain.Enum.HTTPMethod;
import com.rocket.ssafast.apispec.dto.request.ApiExecReqMessageDto;
import com.rocket.ssafast.apispec.dto.request.ApiTestResultDto;
import com.rocket.ssafast.apispec.dto.request.ApiTestResultResponseDto;
import com.rocket.ssafast.apispec.dto.response.ApiTestResultResponseRawDto;
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

	public ApiTestResultResponseDto requestAPI(
		ApiExecReqMessageDto apiExecReqMessageDto,
		MultipartFile[] files, MultipartFile[][] filesArr,
		String[] filekeys, String[] filesArrKeys) throws IOException {

		if (HTTPMethod.getMethodByNumber(apiExecReqMessageDto.getMethod()) == null) {
			throw new CustomException(ErrorCode.HTTPMETHOD_NOT_FOUND);
		}

		System.out.println("API TEST 서비스:"+ apiExecReqMessageDto);
		// 1. Headers 셋팅
		HttpHeaders headers = new HttpHeaders();
		Map<String, String> reqHeaders = apiExecReqMessageDto.getHeaders();

		if (reqHeaders != null) {
			reqHeaders.forEach((key, value) -> {
				headers.set(key, value);
			});
		}


		// 2. URL에 Path Variable 셋팅
		Map<String, String> reqPathVars = apiExecReqMessageDto.getPathVars();
		StringBuilder sb = new StringBuilder();

		String[] splitedUrl = apiExecReqMessageDto.getUrl().split("/");

		for (String urlWord : splitedUrl) {

			if (urlWord.length() > 0 && urlWord.charAt(0) == ':' && Character.isAlphabetic(urlWord.charAt(1))) {
				if (reqPathVars == null || urlWord.split(":")[0] == null) {
					throw new CustomException(ErrorCode.BAD_REQUEST);
				}
				sb.append(reqPathVars.get(urlWord.split(":")[1]) + "/");
			} else {
				sb.append(urlWord + "/");
			}
		}
		sb.deleteCharAt(sb.lastIndexOf("/"));


		// 3. params 셋팅
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		if (apiExecReqMessageDto.getParams() != null) {
			apiExecReqMessageDto.getParams().forEach((key, value) -> {
				params.add(key, value);
			});
		}


		// 4. 최종 URI 셋팅
		UriComponents uri = UriComponentsBuilder.fromHttpUrl(sb.toString())
			.queryParams(params)
			.build();


		// 5. header, body를 entity에 담기
		HttpEntity<?> entity = null;

		MultiValueMap<String, Object> body = null;
		if (apiExecReqMessageDto.getBody() == null) {
			if(files == null && filesArr == null) {
				entity = new HttpEntity<>(headers);
			}
			else {
				body = new LinkedMultiValueMap<>();

				// MultipartFile Headers
				HttpHeaders multipartHeaders = new HttpHeaders();
				multipartHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

				addMultipartFileToMap(body, multipartHeaders, files, filesArr, filekeys, filesArrKeys);

				// 전체 엔티티 만들기 : 전체 바디와 전체 헤더 넣어
				entity = new HttpEntity<>(body, headers);
			}
		} else {
			// json data
			if (files == null && filesArr == null) {
				entity = new HttpEntity<>(apiExecReqMessageDto.getBody(), headers);
			}

			// json data + form data
			else {
				// 최종 body
				body = new LinkedMultiValueMap<>();

				// 최종 headers
				HttpHeaders requestHeaders = new HttpHeaders();
				requestHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

				// MultipartFile Headers
				HttpHeaders multipartHeaders = new HttpHeaders();
				multipartHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

				// body 맵에 multipart data 넣기
				addMultipartFileToMap(body, multipartHeaders, files, filesArr, filekeys, filesArrKeys);

				// Json Headers
				HttpHeaders jsonHeaders = new HttpHeaders();
				jsonHeaders.setContentType(MediaType.APPLICATION_JSON);

				// json 용 엔티티에 데이터랑 헤더
				ObjectMapper objectMapper = new ObjectMapper();
				Map<String, Object> map = objectMapper.readValue(apiExecReqMessageDto.getBody(), Map.class);

				// 첫 번째 JSON 키와 그 값을 Java Map 객체로 추출
				Map.Entry<String, Object> entry = map.entrySet().iterator().next();
				String jsonKey = entry.getKey();
				String jsonValue = objectMapper.writeValueAsString(entry.getValue());

				HttpEntity<?> requestEntityJSON = new HttpEntity<>(jsonValue, jsonHeaders);

				body.set(jsonKey, requestEntityJSON);        // json 용 엔티티를 바디에 넣음

				// 전체 엔티티 만들기 : 전체 바디와 전체 헤더 넣어
				entity = new HttpEntity<>(body, headers); //final request
			}
		}


		// 6. API 요청
		try {
			ResponseEntity<?> response =  restTemplate.exchange(
				uri.toUriString(),
				HTTPMethod.getMethodByNumber(apiExecReqMessageDto.getMethod()),
				entity,
				new ParameterizedTypeReference<Object>() {
				});

			HttpHeaders httpHeaders = response.getHeaders();
			Map<String, List> resHeader = new HashMap<>();
			httpHeaders.forEach((key, value) -> resHeader.put(key, value));

			return ApiTestResultResponseRawDto.builder()
				.headers(resHeader)
				.body(response.getBody())
				.statusCode(response.getStatusCode().name())
				.statusCodeValue(response.getStatusCodeValue())
				.build()
				.toResponseDto();

		} catch (HttpClientErrorException | HttpServerErrorException e){
			throw new HttpClientErrorException(e.getStatusCode(), e.getMessage());
		}
	}

	public void addMultipartFileToMap(MultiValueMap<String, Object> body, HttpHeaders multipartHeaders,
		MultipartFile[] files, MultipartFile[][] filesArr,
		String[] filekeys, String[] filesArrKeys) throws IOException {

		if (files != null) {
			for (int i = 0, len = files.length; i < len; i++) {
				try {
					// MultipartFile Entity
					HttpEntity<ByteArrayResource> multipartEntity;

					int finalI = i;
					ByteArrayResource fileResource = new ByteArrayResource(
						files[finalI].getBytes()) {    // 파일을 ByteArrayResource로 변환
						@Override
						public String getFilename() {
							return files[finalI].getOriginalFilename();
						}
					};
					multipartEntity = new HttpEntity<>(fileResource, multipartHeaders);        // 파일용에 바디랑 헤더 셋팅

					// 전체 바디에 파일용 엔티티 넣음
					body.set(filekeys[i], multipartEntity);
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			}
		}

		if (filesArr != null) {
			for (int i = 0, len = filesArr.length; i < len; i++) {

				for (MultipartFile file : filesArr[i]) {
					// 파일 데이터 읽기
					byte[] fileData = file.getBytes();
					ByteArrayResource resource = new ByteArrayResource(fileData) {
						@Override
						public String getFilename() {
							return file.getOriginalFilename();
						}
					};

					// ByteArrayResource 추가
					body.add(filesArrKeys[i], resource);
				}
			}
		}
	}

	@Transactional
	public void saveApiTestResult(ApiTestResultDto apiTestResultDto) {
		if(apiTestResultDto.getName() == null || apiTestResultDto.getMember() == null || apiTestResultDto.getApiInfoId() == null) {
			throw new CustomException(ErrorCode.BAD_REQUEST);
		}
		if(!apiSpecRepository.findById(apiTestResultDto.getApiInfoId()).isPresent()) {
			throw new CustomException(ErrorCode.API_NOT_FOUND);
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
