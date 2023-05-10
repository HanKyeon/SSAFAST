package com.rocket.ssafast.usecase.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.jayway.jsonpath.JsonPath;
import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apispec.dto.request.ApiExecReqMessageDto;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.service.ApiExecService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.usecase.domain.UsecaseTestDocument;
import com.rocket.ssafast.usecase.domain.element.UsecaseTestDetailInfo;
import com.rocket.ssafast.usecase.domain.element.UsecaseTestInfo;
import com.rocket.ssafast.usecase.domain.element.request.UsecaseTestReqBody;
import com.rocket.ssafast.usecase.domain.element.request.UsecaseTestReqFieldDetail;
import com.rocket.ssafast.usecase.domain.element.request.UsecaseTestReqHeaderFieldDetail;
import com.rocket.ssafast.usecase.domain.element.request.UsecaseTestReqNestedDto;
import com.rocket.ssafast.usecase.domain.element.request.UsecaseTestRequest;
import com.rocket.ssafast.usecase.dto.request.UsecaseTestReqEntityDto;
import com.rocket.ssafast.usecase.repository.UsecaseTestDocsRepository;
import com.rocket.ssafast.usecase.repository.UsecaseTestEntityRepository;
import com.rocket.ssafast.workspace.repository.BaseurlRepository;
import com.rocket.ssafast.workspace.repository.WorkspaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsecaseTestService {

	@Value("${mongoid.document.usecase}")
	String SSAFAST_USECASE_TEST;
	private final UsecaseTestDocsRepository usecaseTestDocsRepository;
	private final UsecaseTestEntityRepository usecaseTestEntityRepository;
	private final WorkspaceRepository workspaceRepository;
	private final ApiSpecRepository apiSpecRepository;
	private final ApiExecService apiExecService;
	private final BaseurlRepository baseurlRepository;

	@Transactional
	public Long saveUsecaseTestEntity(UsecaseTestReqEntityDto usecaseTestReqEntityDto) {
		if(!workspaceRepository.findById(usecaseTestReqEntityDto.getWorkspaceId()).isPresent()) {
			throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
		}
		return usecaseTestEntityRepository.save(usecaseTestReqEntityDto.toEntity()).getId();
	}

	public Object execUsecaseTest(long usecaseTestId, UsecaseTestInfo usecaseTestInfo,
		MultipartFile[] files, MultipartFile[][] filesArrs,
		String[] filekeys, String[] filesArrKeys) {

		if(!usecaseTestEntityRepository.findById(usecaseTestId).isPresent()) {
			throw new CustomException(ErrorCode.USECASETEST_NOT_FOUND);
		}

		// 1. UsecaseTest 정보
		Long nowApiId = usecaseTestInfo.getRootApiId();										// 시작 api id
		Map<String, UsecaseTestDetailInfo> testDetails = usecaseTestInfo.getTestDetails();	// usecase test 정보


		// 2. UsecaseTest 정보 json 파싱
		Gson gson = new Gson();
		String testDetailsJson = gson.toJsonTree(testDetails).getAsString();


		while(nowApiId != null) {

			// 3. api entity
			Optional<ApiSpecEntity> apiSpecOptional = apiSpecRepository.findById(nowApiId);
			if(!apiSpecOptional.isPresent()) {
				throw new CustomException(ErrorCode.API_NOT_FOUND);
			}

			ApiSpecEntity apiSpec = apiSpecOptional.get();


			// 4. url 생성
			long baseUrlId = apiSpec.getBaseurlId();
			String baseUrl = baseurlRepository.findById(baseUrlId).get().getUrl();
			System.out.println("baseUrl: " + baseUrl);

			UsecaseTestDetailInfo nowUsecaseDetail = testDetails.get(nowApiId);				// 현재 순서 api의 테스트 정보
			String url = baseUrl + "/" + nowUsecaseDetail.getAdditionalUrl();				// path variable 포함 url


			// 5. method
			int method = apiSpec.getMethod();


			// 6. headers
			UsecaseTestRequest nowRequest = nowUsecaseDetail.getRequest();					// 현재 순서 api의 request 정보

			Map<String, UsecaseTestReqHeaderFieldDetail> nowHeaders = nowRequest.getHeaders();
			Map<String, String> headers;
			if(nowHeaders != null) {
				headers  = new HashMap<>();
				nowHeaders.forEach((key, header) -> {
					if(!header.isMapped()) {
						headers.put(key, String.valueOf(header.getValue()));
					} else {
						headers.put(key, getMappedValue(testDetailsJson, String.valueOf(header.getValue())).getAsString());
					}
				});
			} else {
				headers = null;
			}


			// 7. path variable
			Map<String, UsecaseTestReqFieldDetail> nowPathVars = nowRequest.getPathVars();	// 현재 순서 api의 path variable 정보
			Map<String, String> pathVars;

			if(nowPathVars != null) {
				pathVars = new HashMap<>();
				nowPathVars.forEach((key, pathVar) -> {
					if(!pathVar.isMapped()) {
						pathVars.put(key, String.valueOf(pathVar.getValue()));
					} else {
						pathVars.put(key, getMappedValue(testDetailsJson, String.valueOf(pathVar.getValue())).getAsString());
					}
				});
			}


			// 8. query params
			Map<String, UsecaseTestReqFieldDetail> nowParams = nowRequest.getPathVars();	// 현재 순서 api의 query params 정보
			Map<String, String> params;

			if(nowParams != null) {
				params = new HashMap<>();
				nowParams.forEach((key, param) -> {
					if(!param.isMapped()) {
						params.put(key, String.valueOf(param.getValue()));
					} else {
						params.put(key, getMappedValue(testDetailsJson, String.valueOf(param.getValue())).getAsString());
					}
				});
			} else {
				params = null;
			}

			
			// 9. json body
			UsecaseTestReqBody nowBody = nowRequest.getBody();
			String body = null;

			if(nowBody != null) {
				JsonObject jsonBody = new JsonObject();

				// 9-1. primitive type field
				Map<String, UsecaseTestReqFieldDetail> nowFields = nowBody.getFields();
				if(nowFields != null) {
					nowFields.forEach((key, field) -> {
						addPrimitiveDataToJson(jsonBody, field.getType(), key, field.getValue(), field.isItera());
					});
				}

				// 9-2. nested dto
				Map<String, UsecaseTestReqNestedDto> nowNestedDtos = nowBody.getNestedDtos();
				if(nowNestedDtos != null) {
					nowNestedDtos.forEach((key, nowNestedDto) -> {
						JsonObject nestedJson = new JsonObject();

						// 객체 배열 아닌 경우
						if(!nowNestedDto.getItera()) {
							nowNestedDto.getFields().forEach((fieldKey, field) -> {
								addPrimitiveDataToJson(nestedJson, field.getType(), fieldKey, field.getValue(), field.isItera());
							});
						}
						// 객체 배열인 경우
						else {

						}
					});
				}

				body = jsonBody.getAsString();
			}


		/*
			@NotEmpty
			String url;

			@NotNull
			Integer method;

			Map<String, String> headers;

			Map<String, String> pathVars;

			Map<String, String> params;

			String body;
		 */

			ApiExecReqMessageDto apiExecReqMessageDto = ApiExecReqMessageDto.builder()
				.url(url)
				.method(method)
				.headers(headers)
				.params(params)
				.body(body)
				.build();
		}

		// usecase test 정보 업데이트
		Map<Long, UsecaseTestInfo> usecaseTest = new HashMap<>();
		usecaseTest.put(usecaseTestId, usecaseTestInfo);

		usecaseTestDocsRepository.save(
			UsecaseTestDocument.builder()
				.id(SSAFAST_USECASE_TEST)
				.usecaseTest(usecaseTest)
				.build());
		
		// usecase test에 포함된 dto 정보 업데이트
		
		
		// 마지막 response 정보 리턴
		return null;
	}
	
	private void addPrimitiveDataToJson(JsonObject jsonObject, String type, String key, Object value, boolean isItera){
		if(type.equals("String") || type.equals("Date") || type.equals("LocalDateTime")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((String[]) value)).forEach(strValue -> jsonArray.add(strValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, String.valueOf(value));
			}
		}
		else if(type.equals("int")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((Integer[]) value)).forEach(intValue -> jsonArray.add(intValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, (int)value);
			}
		}
		else if(type.equals("long")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((Long[]) value)).forEach(longValue -> jsonArray.add(longValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, (long) value);
			}
		}
		else if(type.equals("float")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((Float[]) value)).forEach(floatValue -> jsonArray.add(floatValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, (float)value);
			}
		}
		else if(type.equals("double")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((Double[]) value)).forEach(doubleValue -> jsonArray.add(doubleValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, (double)value);
			}
		}
		else if(type.equals("boolean")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((Boolean[]) value)).forEach(boolValue -> jsonArray.add(boolValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, (boolean)value);
			}
		}
	}

	public JsonElement getMappedValue(String testDetailsJson, String mappingTarget) {
		JsonElement value = JsonPath.read(testDetailsJson, "$." + mappingTarget);
		return value;
	}
}
