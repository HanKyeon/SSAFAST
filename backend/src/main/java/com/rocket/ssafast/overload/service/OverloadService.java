package com.rocket.ssafast.overload.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rocket.ssafast.apispec.domain.Document.ApiTestResultDocument;
import com.rocket.ssafast.apispec.domain.Entity.ApiTestResultEntity;
import com.rocket.ssafast.apispec.domain.Enum.HTTPMethod;
import com.rocket.ssafast.apispec.dto.request.ApiExecReqMessageDto;
import com.rocket.ssafast.apispec.dto.request.ApiTestResultDto;
import com.rocket.ssafast.apispec.dto.response.ApiTestResultSummaryDto;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.repository.ApiTestResultDocsRepository;
import com.rocket.ssafast.apispec.repository.ApiTestResultEntityRepository;
import com.rocket.ssafast.auth.service.RedisService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.overload.dto.request.CertCodeDto;
import com.rocket.ssafast.overload.dto.request.OverloadExecDto;
import com.rocket.ssafast.overload.dto.response.CheckBaseurlDto;
import com.rocket.ssafast.workspace.domain.Baseurl;
import com.rocket.ssafast.workspace.domain.Workspace;
import com.rocket.ssafast.workspace.dto.response.BaseurlDto;
import com.rocket.ssafast.workspace.repository.BaseurlRepository;
import com.rocket.ssafast.workspace.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
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

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class OverloadService {

	@Value("${mongoid.document.test}")
	private String SSAFAST_TEST_ID;
	private static final RestTemplate restTemplate;
	private final BaseurlRepository baseurlRepository;
	private final WorkspaceRepository workspaceRepository;
	private final RedisService redisService;

	public ResponseEntity<?> requestOverload(OverloadExecDto overloadExecDto) throws JsonProcessingException {
		ApiExecReqMessageDto apiExecReqMessageDto = overloadExecDto.getApiExecReqMessageDto();

		if(HTTPMethod.getMethodByNumber(apiExecReqMessageDto.getMethod()) == null) {
			throw new CustomException(ErrorCode.HTTPMETHOD_NOT_FOUND);
		}

		// 1. URL에 Path Variable 셋팅
		Map<String, String> reqPathVars = apiExecReqMessageDto.getPathVars();
		StringBuilder sb = new StringBuilder();

		String[] splitedUrl = apiExecReqMessageDto.getUrl().split("/");

		for(String urlWord : splitedUrl) {
			if(urlWord.length() > 0 && urlWord.charAt(0) == ':' && Character.isAlphabetic(urlWord.charAt(1))) {
				if(reqPathVars == null || urlWord.split(":")[0] == null) {
					throw new CustomException(ErrorCode.BAD_REQUEST);
				}
				sb.append(reqPathVars.get(urlWord.split(":")[1])+"/");
			} else {
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


		// 5. Headers 셋팅
		HttpHeaders headers = new HttpHeaders();
		Map<String, String> reqHeaders = apiExecReqMessageDto.getHeaders();

		if(reqHeaders != null) {
			reqHeaders.forEach( (key, value) -> {
				headers.set(key, value);
			});
		}

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

	public CheckBaseurlDto checkBaseurl(Long workspaceId) {
		if(!workspaceRepository.existsById(workspaceId)){
			throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
		}
		List<Baseurl> baseurls = baseurlRepository.findAllByWorkspaceId(workspaceId);

		List<BaseurlDto> baseurlDtos = new ArrayList<>();
		for(Baseurl baseurl : baseurls){
			if(!baseurl.getIsCertified()){
				baseurlDtos.add(BaseurlDto.builder()
						.id(baseurl.getId())
						.url(baseurl.getUrl())
						.isCertified(baseurl.getIsCertified()).build());
			}
		}

		if(baseurlDtos.size() > 0){
			return CheckBaseurlDto.builder()
					.certification(false)
					.baseurls(baseurlDtos).build();
		}else{
			return CheckBaseurlDto.builder()
					.certification(true).build();
		}
	}

	public static int generateCertCode() {
		return ThreadLocalRandom.current().nextInt(100000, 1000000);
	}

	public void sendCertCode(Long workspaceId) {
		// 1. 인증 안 된 baseurl 목록 확인
		List<Baseurl> baseurls = baseurlRepository.findAllByWorkspaceIdAndIsCertifiedFalse(workspaceId);
		// 2. baseurl 목록 돌면서
		for(Baseurl baseurl : baseurls){
			// 2-1. 인증번호 생성
			Integer certCode = generateCertCode();
			// 2-2. 인증번호 redis에 저장
			redisService.setValuesWithTimeout("baseurl_" + baseurl.getId().toString(), // key
					certCode.toString(), // value
					600000); // timeout(milliseconds)
			// 2-3. 인증번호 발송 (POST | baseurl/api/ssafast | "certCode is 00000"
			UriComponents uri = UriComponentsBuilder.fromHttpUrl(baseurl.getUrl()+"/api/ssafast")
					.build();

			// body를 entity에 담기
			Map<String, Object> requestBodyMap = new HashMap<>();
			ObjectMapper objectMapper = new ObjectMapper();
			requestBodyMap.put("verification", "cert_code : " + certCode.toString());
			String requestBodyJson = null;
			try {
				requestBodyJson = objectMapper.writeValueAsString(requestBodyMap);
			} catch (JsonProcessingException e) {
				throw new RuntimeException(e);
			}
			HttpEntity<?> entity = new HttpEntity<>(requestBodyJson);

			//요청
			try {
				restTemplate.exchange(
						uri.toUriString(),
						HTTPMethod.getMethodByNumber(2),
						entity,
						new ParameterizedTypeReference<Object>() {
						});
				return;
			} catch (Exception e) {
				throw new RuntimeException("CLIENT_ERROR", e);
			}
		}

	}

	public CheckBaseurlDto checkCertCode(List<CertCodeDto> certCodeDtos) {
		CheckBaseurlDto checkBaseurlDto = new CheckBaseurlDto();
		checkBaseurlDto.setCertification(true);
		checkBaseurlDto.setBaseurls(new ArrayList<>());
		//1. for문 돌면서
		for(CertCodeDto certCodeDto : certCodeDtos){
			Integer correctCode = Integer.parseInt(redisService.getValues("baseurl_" + certCodeDto.getBaseurlId().toString()));
			if(correctCode == certCodeDto.getCode()){
				Baseurl baseurl = baseurlRepository.findById(certCodeDto.getBaseurlId()).get();
				baseurl.updateCertified(true);
				baseurlRepository.save(baseurl);
			}else{
				checkBaseurlDto.setCertification(false);
				checkBaseurlDto.getBaseurls().add(baseurlRepository.findById(certCodeDto.getBaseurlId()).get().toDto());
			}
		}

		return checkBaseurlDto;
	}
}
