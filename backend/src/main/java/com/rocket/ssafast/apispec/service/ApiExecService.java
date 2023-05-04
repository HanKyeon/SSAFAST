package com.rocket.ssafast.apispec.service;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Map;

import org.bson.json.JsonObject;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import net.minidev.json.JSONObject;

import com.rocket.ssafast.apispec.domain.Enum.HTTPMethod;
import com.rocket.ssafast.apispec.dto.request.ExecReqMessageDto;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;

@Service
public class ApiExecService {
	private static final RestTemplate restTemplate;

	public ResponseEntity<?> requestAPI(ExecReqMessageDto execReqMessageDto) {

		if(HTTPMethod.getMethodByStatus(execReqMessageDto.getMethod()) == null) {
			throw new CustomException(ErrorCode.HTTPMETHOD_NOT_FOUND);
		}

		// 1. Headers 셋팅
		HttpHeaders headers = new HttpHeaders();
		Map<String, String> reqHeaders = execReqMessageDto.getHeaders();

		if(reqHeaders != null) {
			reqHeaders.forEach( (key, value) -> {
				headers.set(key, value);
			});
		}

		// 2. URL에 Path Variable 셋팅
		Map<String, String> reqPathVars = execReqMessageDto.getPathVars();
		StringBuilder sb = new StringBuilder();

		String[] splitedUrl = execReqMessageDto.getUrl().split("/");

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
		if(execReqMessageDto.getParams() != null) {
			execReqMessageDto.getParams().forEach((key, value) -> {
				params.add(key, value);
			});
		}
		// 4. 최종 URI 셋팅
		UriComponents uri = UriComponentsBuilder.fromHttpUrl(sb.toString())
			.queryParams(params)
			.build();

		System.out.println("UUUUUUUUUUUUUUUUUUUUUUU: "+uri.toUriString());
		// 5. header, body를 entity에 담기
		JSONObject body = new JSONObject(execReqMessageDto.getBody());
		HttpEntity entity;
		if(body == null) {
			entity = new HttpEntity<>(headers);
		} else {
			entity = new HttpEntity<>(body, headers);
		}

		System.out.println("entity: "+entity);
		System.out.println("body: "+entity.getBody().getClass().getName());
		// 6. API 요청
		try {
			return restTemplate.exchange(
				uri.toUriString(),
				HTTPMethod.getMethodByStatus(execReqMessageDto.getMethod()),
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
}
