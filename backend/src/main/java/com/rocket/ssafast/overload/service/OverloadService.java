package com.rocket.ssafast.overload.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rocket.ssafast.apiexec.dto.request.ReqApiExecMessageDto;
import com.rocket.ssafast.apispec.domain.Enum.HTTPMethod;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.auth.service.RedisService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.overload.domain.OverloadTestHistory;
import com.rocket.ssafast.overload.dto.request.CertCodeDto;
import com.rocket.ssafast.overload.dto.response.*;
import com.rocket.ssafast.overload.repository.OverloadTestHistoryRepository;
import com.rocket.ssafast.workspace.domain.Baseurl;
import com.rocket.ssafast.workspace.dto.response.BaseurlDto;
import com.rocket.ssafast.workspace.repository.BaseurlRepository;
import com.rocket.ssafast.workspace.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.UnknownContentTypeException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
@Slf4j
public class OverloadService {
	@Value("${mongoid.document.test}")
	private String SSAFAST_TEST_ID;
	private static final RestTemplate restTemplate;
	private final BaseurlRepository baseurlRepository;
	private final WorkspaceRepository workspaceRepository;
	private final RedisService redisService;
	private final OverloadTestHistoryRepository overloadTestHistoryRepository;
	private final ApiSpecRepository apiSpecRepository;

	public OverloadTestResDto testOverloadTest(
			ReqApiExecMessageDto reqApiExecMessageDto,
			MultipartFile[] files, MultipartFile[][] filesArr,
			String[] filekeys, String[] filesArrKeys, int duration, int reqSec, long apiSpecId, long workspaceId) throws IOException {

		if (HTTPMethod.getMethodByNumber(reqApiExecMessageDto.getMethod()) == null) {
			throw new CustomException(ErrorCode.HTTPMETHOD_NOT_FOUND);
		}
		OverloadTestResDto overloadTestResDto = new OverloadTestResDto();
		String resultBody = null;

		// 1. URL에 Path Variable 셋팅
		Map<String, String> reqPathVars = reqApiExecMessageDto.getPathVars();
		StringBuilder sb = new StringBuilder();

		String[] splitedUrl = reqApiExecMessageDto.getUrl().split("/");

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


		// 2. params 셋팅
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		if (reqApiExecMessageDto.getParams() != null) {
			reqApiExecMessageDto.getParams().forEach((key, param) -> {
				if (!param.getItera()) {
					params.add(key, param.getValue());
				} else {
					String[] pramArray = param.getValue().substring(1, param.getValue().length() - 1).split(",");
					System.out.println("pramArray: " + Arrays.toString(pramArray));
					Arrays.stream(pramArray).forEach(p -> params.add(key, p));
				}
			});
		}


		// 3. 최종 URI 셋팅
		UriComponents uri = UriComponentsBuilder.fromHttpUrl(sb.toString())
				.queryParams(params)
				.build();

		StringBuilder vegetaBuilder = new StringBuilder();
		vegetaBuilder.append("echo \"").append(HTTPMethod.getMethodByNumber(reqApiExecMessageDto.getMethod())).append(" ");
		vegetaBuilder.append(uri.toUriString());
		vegetaBuilder.append("\" | vegeta attack ");

		if (reqApiExecMessageDto.getBody() != null) {
			vegetaBuilder.append("-body=").append("'").append(reqApiExecMessageDto.getBody()).append("'");
		}
		vegetaBuilder.append(" ");

		Map<String, String> reqHeaders = reqApiExecMessageDto.getHeaders();

		if (reqHeaders != null) {
			reqHeaders.forEach((key, value) -> {
				vegetaBuilder.append("-header=").append("'").append(key).append(":").append(value).append("'").append(" ");
			});
		}

		vegetaBuilder.append("-duration=").append(duration).append("s").append(" ");
		vegetaBuilder.append("-rate=").append(reqSec);
		vegetaBuilder.append(" | vegeta report -type=json");


		// Flask 서버의 엔드포인트 URL 설정
		String flaskEndpoint = "http://3.36.61.67:5000/process_vegeta_command";

		// Flask 서버로 전송할 데이터 설정
		String vegetaCommand = vegetaBuilder.toString();
		MultiValueMap<String, String> bodyMap = new LinkedMultiValueMap<>();
		bodyMap.add("vegeta_command", vegetaCommand);

		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);


		// HttpEntity 생성 (요청 바디와 헤더 포함)
		HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(bodyMap, headers);

		// RestTemplate을 사용하여 POST 요청 보내기
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(
				flaskEndpoint,
				HttpMethod.POST,
				entity,
				String.class
		);

		// 응답 처리
		if (response.getStatusCode().is2xxSuccessful()) {
			resultBody = response.getBody();
//			System.out.println("Flask 서버 응답 결과: " + result);
			try {
				ObjectMapper objectMapper = new ObjectMapper();
				JsonNode jsonNode = objectMapper.readTree(resultBody);

				// JSON 데이터에 접근하여 필요한 값을 추출하거나 사용할 수 있습니다
				System.out.println(jsonNode.toString());
				JsonNode parsingNode = objectMapper.readTree(jsonNode.get("result").asText());

				Map<String, Object> latenciesMap = objectMapper.convertValue(parsingNode.get("latencies"), Map.class);
				Map<String, Object> statusMap = objectMapper.convertValue(parsingNode.get("status_codes"), Map.class);

				List<StatusCodeDto> statusCodeDtos = new ArrayList<>();
				for(Map.Entry entry : statusMap.entrySet()){
					statusCodeDtos.add(StatusCodeDto.builder()
							.code((String) entry.getKey())
							.count((Integer) entry.getValue()).build());
				}
				overloadTestResDto.setStatusCodes(statusCodeDtos);

				overloadTestResDto.setLatencies(LatenciesDto.builder().total((Integer)latenciesMap.get("total"))
						.fiftieth((Integer) latenciesMap.get("50th"))
						.max((Integer) latenciesMap.get("max"))
						.mean((Integer) latenciesMap.get("mean"))
						.ninetyFifth((Integer) latenciesMap.get("95th"))
						.ninetyNinth((Integer) latenciesMap.get("99th")).build());

				overloadTestResDto.setRequests(parsingNode.get("requests").asInt());
				overloadTestResDto.setDuration(duration);
				overloadTestResDto.setSuccess(parsingNode.get("success").asInt());
				overloadTestResDto.setThroughput(parsingNode.get("throughput").asInt());


			} catch (Exception e) {
				// 예외 처리
				e.printStackTrace();

			}
		} else {
			System.out.println("Flask 서버 응답 실패: " + response.getStatusCodeValue());
		}

		overloadTestHistoryRepository.save(OverloadTestHistory.builder()
				.latencyMean(overloadTestResDto.getLatencies().getMean())
				.apiSpecEntity(apiSpecRepository.findById(apiSpecId).get())
				.workspace(workspaceRepository.findById(workspaceId).get())
				.throughput(overloadTestResDto.getThroughput())
				.reqSec(reqSec)
				.duration(duration)
				.detail(resultBody).build());

		return overloadTestResDto;

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
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			HttpEntity<?> entity = new HttpEntity<>(requestBodyJson, headers);

			//요청
			try {
				restTemplate.exchange(
						uri.toUriString(),
						HTTPMethod.getMethodByNumber(2),
						entity,
						new ParameterizedTypeReference<Object>() {
						});
				return;
			} catch(UnknownContentTypeException e){
				continue;
			}
			catch (Exception e) {
				e.printStackTrace();
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
			redisService.getAllKeysAndValues().forEach((key, value) -> {
				System.out.println("key: "+ key +"/ values: "+value);
			});
			String correctCode = redisService.getValues("baseurl_" + certCodeDto.getBaseurlId().toString());
			if(correctCode.equals(certCodeDto.getCode())){
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

	public OverloadListDto getOverloadList(Long apiId) {
		List<OverloadTestHistory> overloadTestHistories = overloadTestHistoryRepository.findAllByApiSpecEntity(apiSpecRepository.findById(apiId).get());
		List<OverloadDto> overloadList = new ArrayList<>();

		for(OverloadTestHistory overloadTestHistory : overloadTestHistories){
			overloadList.add(OverloadDto.builder()
					.createdTime(overloadTestHistory.getCreatedTime())
					.latencyMean(overloadTestHistory.getLatencyMean())
					.id(overloadTestHistory.getId())
					.duration(overloadTestHistory.getDuration())
					.reqSec(overloadTestHistory.getReqSec())
					.throughput(overloadTestHistory.getThroughput())
					.build());
		}

		return OverloadListDto.builder().overlosdList(overloadList).
				build();
	}

	public OverloadTestResDto getOverloadDetail(Long testId) {

		OverloadTestHistory overloadTestHistory = overloadTestHistoryRepository.findById(testId).get();
		String resultBody = overloadTestHistory.getDetail();
		OverloadTestResDto overloadTestResDto = new OverloadTestResDto();

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(resultBody);

			// JSON 데이터에 접근하여 필요한 값을 추출하거나 사용할 수 있습니다
			System.out.println(jsonNode.toString());
			JsonNode parsingNode = objectMapper.readTree(jsonNode.get("result").asText());

			Map<String, Object> latenciesMap = objectMapper.convertValue(parsingNode.get("latencies"), Map.class);
			Map<String, Object> statusMap = objectMapper.convertValue(parsingNode.get("status_codes"), Map.class);

			List<StatusCodeDto> statusCodeDtos = new ArrayList<>();
			for(Map.Entry entry : statusMap.entrySet()){
				statusCodeDtos.add(StatusCodeDto.builder()
						.code((String) entry.getKey())
						.count((Integer) entry.getValue()).build());
			}
			overloadTestResDto.setStatusCodes(statusCodeDtos);

			overloadTestResDto.setLatencies(LatenciesDto.builder().total((Integer)latenciesMap.get("total"))
					.fiftieth((Integer) latenciesMap.get("50th"))
					.max((Integer) latenciesMap.get("max"))
					.mean((Integer) latenciesMap.get("mean"))
					.ninetyFifth((Integer) latenciesMap.get("95th"))
					.ninetyNinth((Integer) latenciesMap.get("99th")).build());

			overloadTestResDto.setRequests(parsingNode.get("requests").asInt());
			overloadTestResDto.setDuration(overloadTestHistory.getDuration());
			overloadTestResDto.setSuccess(parsingNode.get("success").asInt());
			overloadTestResDto.setThroughput(parsingNode.get("throughput").asInt());


		} catch (Exception e) {
			// 예외 처리
			e.printStackTrace();

		}

		return overloadTestResDto;
	}
}
