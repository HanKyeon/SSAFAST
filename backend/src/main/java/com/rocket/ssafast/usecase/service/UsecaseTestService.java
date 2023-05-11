package com.rocket.ssafast.usecase.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.jayway.jsonpath.JsonPath;
import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apispec.dto.request.ApiExecReqMessageDto;
import com.rocket.ssafast.apispec.dto.request.ApiTestResultResponseDto;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.service.ApiExecService;
import com.rocket.ssafast.dtospec.domain.ApiHasDtoEntity;
import com.rocket.ssafast.dtospec.repository.ApiHasDtoEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.usecase.domain.document.UsecaseTestDocument;
import com.rocket.ssafast.usecase.domain.document.element.UsecaseTestDetailInfo;
import com.rocket.ssafast.usecase.domain.document.element.UsecaseTestInfo;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseTestReqBody;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseTestReqFieldDetail;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseTestReqHeaderFieldDetail;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseTestReqNestedDto;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseTestReqPathFieldDetail;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseTestRequest;
import com.rocket.ssafast.usecase.domain.entity.UsecaseTestDtoEntity;
import com.rocket.ssafast.usecase.domain.entity.UsecaseTestEntity;
import com.rocket.ssafast.usecase.dto.request.ReqUsecaseTestEntityDto;
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
	private final ApiHasDtoEntityRepository apiHasDtoEntityRepository;

	@Transactional
	public Long saveUsecaseTestEntity(ReqUsecaseTestEntityDto reqUsecaseTestEntityDto) {
		if(!workspaceRepository.findById(reqUsecaseTestEntityDto.getWorkspaceId()).isPresent()) {
			throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
		}
		return usecaseTestEntityRepository.save(reqUsecaseTestEntityDto.toEntity()).getId();
	}

	@Transactional
	public Object execUsecaseTest(long usecaseTestId, UsecaseTestInfo usecaseTestInfo,
		MultipartFile[] files, MultipartFile[][] filesArrs,
		String[] filekeys, String[] filesArrKeys) {

		Optional<UsecaseTestEntity> usecaseTestEntityOptional = usecaseTestEntityRepository.findById(usecaseTestId);
		if(!usecaseTestEntityOptional.isPresent()) {
			throw new CustomException(ErrorCode.USECASETEST_NOT_FOUND);
		}

		
		// 1. UsecaseTest 정보
		String nowApiId = usecaseTestInfo.getRootApiId();										// 시작 api id
		Map<String, UsecaseTestDetailInfo> testDetails = usecaseTestInfo.getTestDetails();	// usecase test 정보

		ApiTestResultResponseDto apiTestResultResponseDto = null;							// api 응답 저장 객체

		Gson gson = new Gson();																// json 파싱 객체

		JsonObject results = new JsonObject();												// 응답 데이터 축적 객체
		

		while(nowApiId != null) {
			System.out.println("nowApiId: "+nowApiId);

			// 2. api entity 가져오기
			Optional<ApiSpecEntity> apiSpecOptional = apiSpecRepository.findById(Long.parseLong(nowApiId));
			if(!apiSpecOptional.isPresent()) {
				throw new CustomException(ErrorCode.API_NOT_FOUND);
			}
			ApiSpecEntity apiSpec = apiSpecOptional.get();


			// 3. url 생성
			long baseUrlId = apiSpec.getBaseurlId();
			String baseUrl = baseurlRepository.findById(baseUrlId).get().getUrl();
			System.out.println("baseUrl: " + baseUrl);

			UsecaseTestDetailInfo nowUsecaseDetail = testDetails.get(nowApiId);	// 현재 순서 api의 테스트 정보
			String url = baseUrl + nowUsecaseDetail.getAdditionalUrl();					// path variable 포함 url


			// 4. method
			int method = apiSpec.getMethod();


			// 5. request 정보
			UsecaseTestRequest nowRequest = nowUsecaseDetail.getRequest();					// 현재 순서 api의 request 정보

			
			// 6. headers 정보
			Map<String, UsecaseTestReqHeaderFieldDetail> nowHeaders = nowRequest.getHeaders();
			Map<String, String> headers;
			
			if(nowHeaders != null) {
				headers  = new HashMap<>();
				nowHeaders.forEach((key, header) -> {
					if(!header.isMapped()) {
						headers.put(key, String.valueOf(header.getValue()));
					} else {
						headers.put(key, String.valueOf(getMappedValue(results.toString(), String.valueOf(header.getValue()))));
					}
				});
			} else {
				headers = null;
			}


			// 7. path variable 정보
			Map<String, UsecaseTestReqPathFieldDetail> nowPathVars = nowRequest.getPathVars();	// 현재 순서 api의 path variable 정보
			Map<String, String> pathVars;

			if(nowPathVars != null) {
				pathVars = new HashMap<>();
				nowPathVars.forEach((key, pathVar) -> {
					if(!pathVar.isMapped()) {
						pathVars.put(key, String.valueOf(pathVar.getValue()));
					} else {
						pathVars.put(key, String.valueOf(getMappedValue(results.toString(), String.valueOf(pathVar.getValue()))));
					}
				});
			} else {
				pathVars = null;
			}


			// 8. query params 정보
			Map<String, UsecaseTestReqFieldDetail> nowParams = nowRequest.getParams();	// 현재 순서 api의 query params 정보
			Map<String, String> params;

			if(nowParams != null) {
				params = new HashMap<>();
				nowParams.forEach((key, param) -> {
					if(!param.isMapped()) {
						params.put(key, String.valueOf(param.getValue()));
					} else {
						params.put(key, String.valueOf(getMappedValue(results.toString(), String.valueOf(param.getValue()))));
					}
				});
			} else {
				params = null;
			}

			
			// 9. json body 정보
			UsecaseTestReqBody nowBody = nowRequest.getBody();
			String body = null;

			if(nowBody != null) {
				JsonObject jsonBody = new JsonObject();

				// 9-1. primitive type field
				Map<String, UsecaseTestReqFieldDetail> nowFields = nowBody.getFields();
				if(nowFields != null) {
					nowFields.forEach((key, field) -> {
						if(!field.isMapped()) {
							addPrimitiveDataToJson(jsonBody, field.getType(), key, field.getValue(), field.isItera());
						} else {
							Object fieldValue = getMappedValue(results.toString(), String.valueOf(field.getValue()));
							addPrimitiveDataToJson(jsonBody, field.getType(), key, fieldValue, field.isItera());
						}
					});
				}

				// 9-2. nested dto
				Map<String, UsecaseTestReqNestedDto> nowNestedDtos = nowBody.getNestedDtos();
				if(nowNestedDtos != null) {
					nowNestedDtos.forEach((key, nowNestedDto) -> {

						JsonObject nestedJson = new JsonObject();

						nowNestedDto.getFields().forEach((fieldKey, field) -> {
							if(!field.isMapped()) {
								addPrimitiveDataToJson(nestedJson, field.getType(), fieldKey, field.getValue(), field.isItera());
							} else {
								Object fieldValue = getMappedValue(results.toString(), String.valueOf(field.getValue()));
								addPrimitiveDataToJson(nestedJson, field.getType(), fieldKey, fieldValue, field.isItera());
							}
						});

						jsonBody.add(key, nestedJson);
					});
				}

				//  9-3. nested dto list
				Map<String, List<UsecaseTestReqNestedDto>> nowNestedDtoLists = nowBody.getNestedDtoList();
				if(nowNestedDtoLists != null) {
					nowNestedDtoLists.forEach((key, nowNestedDtoList) -> {

						JsonArray nestedJsonArray = new JsonArray();

						nowNestedDtoList.forEach(nowNestedDto -> {
							JsonObject nestedJson = new JsonObject();

							nowNestedDto.getFields().forEach((fieldKey, field) -> {
								if(!field.isMapped()) {
									addPrimitiveDataToJson(nestedJson, field.getType(), fieldKey, field.getValue(), field.isItera());
								} else {
									Object fieldValue = getMappedValue(results.toString(), String.valueOf(field.getValue()));
									addPrimitiveDataToJson(nestedJson, field.getType(), fieldKey, fieldValue, field.isItera());
								}
							});

							nestedJsonArray.add(nestedJson);
						});

						jsonBody.add(key, nestedJsonArray);
					});
				}

				body = jsonBody.toString();
			}


			// 10. 요청 메시지 DTO 생성
			ApiExecReqMessageDto apiExecReqMessageDto = ApiExecReqMessageDto.builder()
				.url(url)
				.method(method)
				.headers(headers)
				.pathVars(pathVars)
				.params(params)
				.body(body)
				.build();

			System.out.println("요청 :"+apiExecReqMessageDto);
			
			// 11. API 요청 전송
			try {
				apiTestResultResponseDto = apiExecService.requestAPI(apiExecReqMessageDto, files, filesArrs, filekeys, filesArrKeys);

				System.out.println("결과: "+apiTestResultResponseDto);
				if(400 <= apiTestResultResponseDto.getStatusCodeValue()) { break; }					// 요청 에러
				
				results.add(nowApiId, gson.toJsonTree(apiTestResultResponseDto));		// 응답 축적
				System.out.println("축적: "+results);
				nowApiId = testDetails.get(nowApiId).getChild();						// 다음 API로 GO

			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}


		// 12. usecase test 정보 업데이트
		Map<Long, UsecaseTestInfo> usecaseTest = new HashMap<>();
		usecaseTest.put(usecaseTestId, usecaseTestInfo);

		usecaseTestDocsRepository.save(
			UsecaseTestDocument.builder()
				.id(SSAFAST_USECASE_TEST)
				.usecaseTest(usecaseTest)
				.build());


		// 13. usecase test에 포함된 dto 정보 업데이트

		// 13-1. usecase에서 쓰이는 api id 목록 -> usecase에서 쓰이는 dto 목록
		UsecaseTestEntity usecaseTestEntity = usecaseTestEntityOptional.get();
		Iterator<String> apiIdSet = testDetails.keySet().iterator();

		List<UsecaseTestDtoEntity> usecaseTestDtoEntities = new ArrayList<>();

		while (apiIdSet.hasNext()) {
			long apiId = Long.parseLong(apiIdSet.next());
			List<ApiHasDtoEntity> apiHasDtoEntities =  apiHasDtoEntityRepository.findAllByApiSpecEntity(
														apiSpecRepository.findById(apiId).get());
			apiHasDtoEntities.forEach(apiHasDtoEntity -> {
				usecaseTestDtoEntities.add(
					UsecaseTestDtoEntity.builder()
						.usecaseTestEntity(usecaseTestEntity)
						.dtoId(apiHasDtoEntity.getDtoSpecEntity().getId())
						.build()
				);
			});
		}

		// 13-2. usecase 저장
		usecaseTestEntity.getUsecaseTestDtoEntities().clear();
		usecaseTestEntity.getUsecaseTestDtoEntities().addAll(usecaseTestDtoEntities);

		usecaseTestEntityRepository.save(usecaseTestEntity);

		return apiTestResultResponseDto;
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
				jsonObject.addProperty(key, ((Number)value).intValue());
			}
		}
		else if(type.equals("long")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((Long[]) value)).forEach(longValue -> jsonArray.add(longValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, ((Number)value).longValue());
			}
		}
		else if(type.equals("float")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((Float[]) value)).forEach(floatValue -> jsonArray.add(floatValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, ((Number)value).floatValue());
			}
		}
		else if(type.equals("double")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((Double[]) value)).forEach(doubleValue -> jsonArray.add(doubleValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, ((Number)value).doubleValue());
			}
		}
		else if(type.equals("boolean")) {
			if(isItera) {
				JsonArray jsonArray = new JsonArray();
				new ArrayList<>(Arrays.asList((Boolean[]) value)).forEach(boolValue -> jsonArray.add(boolValue));
				jsonObject.add(key, jsonArray);
			}
			else {
				jsonObject.addProperty(key, (Boolean) value);
			}
		}
	}

	public Object getMappedValue(String results, String mappingTarget) {
		System.out.println("results :"+results);
		System.out.println("json path: "+"$." + mappingTarget);
		return JsonPath.read(results, "$." + mappingTarget);
	}
}
