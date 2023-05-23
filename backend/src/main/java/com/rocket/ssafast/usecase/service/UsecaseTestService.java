package com.rocket.ssafast.usecase.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.jayway.jsonpath.JsonPath;
import com.rocket.ssafast.apispec.domain.Document.ApiSpecDocument;
import com.rocket.ssafast.apispec.domain.Document.element.ApiTestForDetailResponseBody;
import com.rocket.ssafast.apispec.domain.Document.element.ApiTestResultResponseDoc;
import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apiexec.dto.request.ReqApiExecMessageDto;
import com.rocket.ssafast.apiexec.dto.request.element.ReqApiExecMessageParamDto;
import com.rocket.ssafast.apiexec.dto.request.ReqApiTestResultResponseDto;
import com.rocket.ssafast.apispec.repository.ApiSpecMongoTempRepository;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apiexec.service.ApiExecService;
import com.rocket.ssafast.apispec.service.ApiSpecService;
import com.rocket.ssafast.dtospec.domain.ApiHasDtoEntity;
import com.rocket.ssafast.dtospec.repository.ApiHasDtoEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.usecase.domain.document.UsecaseDocument;
import com.rocket.ssafast.usecase.domain.document.element.UsecaseDetailInfo;
import com.rocket.ssafast.usecase.domain.document.element.UsecaseInfo;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseReqBody;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseReqFieldDetail;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseReqHeaderFieldDetail;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseReqNestedDto;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseReqParamFieldDetail;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseReqPathFieldDetail;
import com.rocket.ssafast.usecase.domain.document.element.request.UsecaseTestRequest;
import com.rocket.ssafast.usecase.domain.entity.UsecaseDtoEntity;
import com.rocket.ssafast.usecase.domain.entity.UsecaseEntity;
import com.rocket.ssafast.usecase.dto.request.ReqUsecaseEntityDto;
import com.rocket.ssafast.usecase.dto.response.ResUsecaseDetailDto;
import com.rocket.ssafast.usecase.dto.response.ResUsecaseLastApiResponseDto;
import com.rocket.ssafast.usecase.dto.response.ResUsecasePrevResponseDto;
import com.rocket.ssafast.usecase.dto.response.ResUsecaseSummaryDto;
import com.rocket.ssafast.usecase.repository.UsecaseTestDocsRepository;
import com.rocket.ssafast.usecase.repository.UsecaseTestEntityRepository;
import com.rocket.ssafast.workspace.repository.BaseurlRepository;
import com.rocket.ssafast.workspace.repository.WorkspaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsecaseTestService {

	@Value("${mongoid.document.api}")
	String SSAFAST_API_SPEC;

	@Value("${mongoid.document.usecase}")
	String SSAFAST_USECASE_TEST;

	private final UsecaseTestDocsRepository usecaseTestDocsRepository;
	private final UsecaseTestEntityRepository usecaseTestEntityRepository;
	private final WorkspaceRepository workspaceRepository;
	private final ApiSpecRepository apiSpecRepository;
	private final ApiExecService apiExecService;
	private final BaseurlRepository baseurlRepository;
	private final ApiHasDtoEntityRepository apiHasDtoEntityRepository;
	private final ApiSpecMongoTempRepository apiSpecMongoTempRepository;
	private final ApiSpecService apiSpecService;

	@Transactional
	public ResUsecaseSummaryDto saveUsecaseTestEntity(ReqUsecaseEntityDto reqUsecaseTestEntityDto) {
		if(!workspaceRepository.findById(reqUsecaseTestEntityDto.getWorkspaceId()).isPresent()) {
			throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
		}
		return usecaseTestEntityRepository.save(reqUsecaseTestEntityDto.toEntity()).toResSummaryDto();
	}

	@Transactional
	public ResUsecaseLastApiResponseDto execUsecaseTest(long usecaseTestId, UsecaseInfo usecaseTestInfo,
		MultipartFile[] files, MultipartFile[][] filesArrs,
		String[] filekeys, String[] filesArrKeys) {

		Optional<UsecaseEntity> usecaseTestEntityOptional = usecaseTestEntityRepository.findById(usecaseTestId);
		if(!usecaseTestEntityOptional.isPresent()) {
			throw new CustomException(ErrorCode.USECASETEST_NOT_FOUND);
		}

		
		// 1. UsecaseTest 정보
		String nowApiId = usecaseTestInfo.getRootApiId();										// 시작 api id
		Map<String, UsecaseDetailInfo> testDetails = usecaseTestInfo.getTestDetails();			// usecase test 정보

		ReqApiTestResultResponseDto reqApiTestResultResponseDto = null;							// api 응답 저장 객체

		Gson gson = new Gson();																// json 파싱 객체

		Long lastApiId = 0L;
		JsonObject results = new JsonObject();												// 응답 데이터 축적 객체

		ReqApiTestResultResponseDto errorResponstDto = null;

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

			UsecaseDetailInfo nowUsecaseDetail = testDetails.get(nowApiId);	// 현재 순서 api의 테스트 정보
			String url = baseUrl + nowUsecaseDetail.getAdditionalUrl();					// path variable 포함 url


			// 4. method
			int method = apiSpec.getMethod();


			// 5. request 정보
			UsecaseTestRequest nowRequest = nowUsecaseDetail.getRequest();					// 현재 순서 api의 request 정보

			
			// 6. headers 정보
			Map<String, UsecaseReqHeaderFieldDetail> nowHeaders = nowRequest.getHeaders();
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
			Map<String, UsecaseReqPathFieldDetail> nowPathVars = nowRequest.getPathVars();	// 현재 순서 api의 path variable 정보
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
			Map<String, UsecaseReqParamFieldDetail> nowParams = nowRequest.getParams();	// 현재 순서 api의 query params 정보
			Map<String, ReqApiExecMessageParamDto> params;

			if(nowParams != null) {
				params = new HashMap<>();
				nowParams.forEach((key, param) -> {
					if(!param.isMapped()) {
						params.put(key,
							ReqApiExecMessageParamDto.builder()
								.itera(param.isItera())
								.value(param.getValue())
								.build());
					} else {
						params.put(key,
							ReqApiExecMessageParamDto.builder()
								.itera(param.isItera())
								.value(String.valueOf(getMappedValue(results.toString(), String.valueOf(param.getValue()))))
								.build()
							);
					}
				});
			} else {
				params = null;
			}

			
			// 9. json body 정보
			UsecaseReqBody nowBody = nowRequest.getBody();
			String body = null;

			if(nowBody != null) {
				JsonObject jsonBody = new JsonObject();

				// 9-1. primitive type field
				Map<String, UsecaseReqFieldDetail> nowFields = nowBody.getFields();
				if(nowFields != null) {
					addFieldsToJson(nowFields, jsonBody, results);
				}

				// 9-2. nested dto
				Map<String, UsecaseReqNestedDto> nowNestedDtos = nowBody.getNestedDtos();
				if(nowNestedDtos != null) {
					nowNestedDtos.forEach((key, nowNestedDto) -> {
						JsonObject nestedJson = new JsonObject();

						addNestedDtosToJson(nowNestedDto, nestedJson, results);

						jsonBody.add(key, nestedJson);
					});
				}

				//  9-3. nested dto list
				Map<String, List<UsecaseReqNestedDto>> nowNestedDtoLists = nowBody.getNestedDtoLists();
				if(nowNestedDtoLists != null) {
					nowNestedDtoLists.forEach((key, nowNestedDtoList) -> {
						JsonArray nestedJsonArray = new JsonArray();

						nowNestedDtoList.forEach(nowNestedDto -> {
							JsonObject nestedJson = new JsonObject();

							addNestedDtosToJson(nowNestedDto, nestedJson, results);

							nestedJsonArray.add(nestedJson);
						});

						jsonBody.add(key, nestedJsonArray);
					});
				}

				body = jsonBody.toString();
			}


			// 10. 요청 메시지 DTO 생성
			ReqApiExecMessageDto reqApiExecMessageDto = ReqApiExecMessageDto.builder()
				.url(url)
				.method(method)
				.headers(headers)
				.pathVars(pathVars)
				.params(params)
				.body(body)
				.build();

			System.out.println("요청 :" + reqApiExecMessageDto);
			
			// 11. API 요청 전송
			try {
				reqApiTestResultResponseDto = apiExecService.requestAPI(reqApiExecMessageDto, files, filesArrs, filekeys, filesArrKeys);

				System.out.println("결과: "+ reqApiTestResultResponseDto);

				results.add(nowApiId, gson.toJsonTree(reqApiTestResultResponseDto));		// 응답 축적
				System.out.println("축적: "+results);

				if(testDetails.get(nowApiId).getChild() == null) {
					lastApiId = Long.parseLong(nowApiId);
				}
				nowApiId = testDetails.get(nowApiId).getChild();						// 다음 API로 GO

			} catch (HttpClientErrorException | HttpServerErrorException e){
				errorResponstDto = ReqApiTestResultResponseDto.builder()
					.statusCodeValue(e.getStatusCode().value())
					.statusCode(e.getStatusCode().name())
					.body(e.getMessage())
					.build();
				break;

			} catch (Exception e) {
				throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
			}
		}


		// 12. usecase test 정보 업데이트
		UsecaseDocument usecaseDocument = usecaseTestDocsRepository.findById(SSAFAST_USECASE_TEST);

		if(usecaseDocument == null) {
			Map<Long, UsecaseInfo> usecaseTest = new HashMap<>();
			usecaseTest.put(usecaseTestId, usecaseTestInfo);

			usecaseTestDocsRepository.save(UsecaseDocument.builder()
					.id(SSAFAST_USECASE_TEST)
					.usecaseTest(usecaseTest)
				.build());
		}
		else {
			usecaseDocument.getUsecaseTest().put(usecaseTestId, usecaseTestInfo);
			usecaseTestDocsRepository.save(usecaseDocument);
		}


		// 13. usecase test에 포함된 dto 정보 업데이트

		// 13-1. usecase에서 쓰이는 api id 목록 -> usecase에서 쓰이는 dto 목록
		UsecaseEntity usecaseEntity = usecaseTestEntityOptional.get();
		Iterator<String> apiIdSet = testDetails.keySet().iterator();

		List<UsecaseDtoEntity> usecaseTestDtoEntities = new ArrayList<>();

		while (apiIdSet.hasNext()) {
			long apiId = Long.parseLong(apiIdSet.next());
			List<ApiHasDtoEntity> apiHasDtoEntities =  apiHasDtoEntityRepository.findAllByApiSpecEntity(
														apiSpecRepository.findById(apiId).get());
			apiHasDtoEntities.forEach(apiHasDtoEntity -> {
				usecaseTestDtoEntities.add(
					UsecaseDtoEntity.builder()
						.usecaseEntity(usecaseEntity)
						.dtoId(apiHasDtoEntity.getDtoSpecEntity().getId())
						.build()
				);
			});
		}

		// 13-2. usecase 저장
		usecaseEntity.getUsecaseTestDtoEntities().clear();
		usecaseEntity.getUsecaseTestDtoEntities().addAll(usecaseTestDtoEntities);

		usecaseTestEntityRepository.save(usecaseEntity);

		if(errorResponstDto == null) {
			return ResUsecaseLastApiResponseDto.builder()
				.success(true)
				.lastApiId(lastApiId)
				.lastApiResponse(reqApiTestResultResponseDto)
				.build();
		} else {
			return ResUsecaseLastApiResponseDto.builder()
				.success(false)
				.lastApiId(Long.parseLong(nowApiId))
				.lastApiResponse(errorResponstDto)
				.build();
		}
	}

	public void addNestedDtosToJson(UsecaseReqNestedDto nowNestedDto, JsonObject jsonObject, JsonObject results) {

		// 1. nested dto의 primitive type field
		if(nowNestedDto.getFields() != null) {
			addFieldsToJson(nowNestedDto.getFields(), jsonObject, results);
		}

		// 2. nested dto의 nested dto field
		if(nowNestedDto.getNestedDtos() != null) {
			JsonObject nestedJson = new JsonObject();

			nowNestedDto.getNestedDtos().forEach((fieldKey, innerNestedDto) -> {
				addFieldsToJson(innerNestedDto.getFields(), nestedJson, results);

				jsonObject.add(fieldKey, nestedJson);
			});
		}

		// 3. nested dto의 nested dto list type field
		if(nowNestedDto.getNestedDtoList() != null) {

			nowNestedDto.getNestedDtoList().forEach((fieldKey, nestedDtoList) -> {
				JsonArray nestedDtoListJson = new JsonArray();

				nestedDtoList.forEach(nestedDto -> {
					JsonObject nestedJson = new JsonObject();

					addFieldsToJson(nestedDto.getFields(), nestedJson, results);
					nestedDtoListJson.add(nestedJson);
				});

				jsonObject.add(fieldKey, nestedDtoListJson);
			});
		}
	}

	public void addFieldsToJson(Map<String, UsecaseReqFieldDetail> fields, JsonObject jsonObject, JsonObject results) {
		fields.forEach((key, field) -> {
			if(!field.isMapped()) {
				addPrimitiveDataToJson(jsonObject, field.getType(), key, field.getValue(), field.isItera());
			} else {
				Object fieldValue = getMappedValue(results.toString(), String.valueOf(field.getValue()));
				addPrimitiveDataToJson(jsonObject, field.getType(), key, fieldValue, field.isItera());
			}
		});
	}

	public void addPrimitiveDataToJson(JsonObject jsonObject, Long type, String key, Object value, boolean isItera){
		switch (type.intValue()) {
			case 1:
			case 8:
			case 9:
				if(isItera) {
					JsonArray jsonArray = new JsonArray();
					new ArrayList<>(Arrays.asList((String[]) value)).forEach(strValue -> jsonArray.add(strValue));
					jsonObject.add(key, jsonArray);
				}
				else {
					jsonObject.addProperty(key, String.valueOf(value));
				}
				break;

			case 2:
				if(isItera) {
					JsonArray jsonArray = new JsonArray();
					new ArrayList<>(Arrays.asList((Integer[]) value)).forEach(intValue -> jsonArray.add(intValue));
					jsonObject.add(key, jsonArray);
				}
				else {
					jsonObject.addProperty(key, ((Number)value).intValue());
				}
				break;

			case 3:
				if(isItera) {
					JsonArray jsonArray = new JsonArray();
					new ArrayList<>(Arrays.asList((Long[]) value)).forEach(longValue -> jsonArray.add(longValue));
					jsonObject.add(key, jsonArray);
				}
				else {
					jsonObject.addProperty(key, ((Number)value).longValue());
				}
				break;

			case 4:
				if(isItera) {
					JsonArray jsonArray = new JsonArray();
					new ArrayList<>(Arrays.asList((Float[]) value)).forEach(floatValue -> jsonArray.add(floatValue));
					jsonObject.add(key, jsonArray);
				}
				else {
					jsonObject.addProperty(key, ((Number)value).floatValue());
				}
				break;

			case 5:
				if(isItera) {
					JsonArray jsonArray = new JsonArray();
					new ArrayList<>(Arrays.asList((Double[]) value)).forEach(doubleValue -> jsonArray.add(doubleValue));
					jsonObject.add(key, jsonArray);
				}
				else {
					jsonObject.addProperty(key, ((Number)value).doubleValue());
				}
				break;

			case 6:
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

	public List<ResUsecasePrevResponseDto> getPrevResponses(List<Long> apiIds) {
		Map<Long, String[]> apiNames = new HashMap<>();
		apiIds.forEach(apiId -> {
			Optional<ApiSpecEntity> apiSpec = apiSpecRepository.findById(apiId);
			if(!apiSpec.isPresent()) {
				throw new CustomException(ErrorCode.API_NOT_FOUND);
			}
			apiNames.put(apiId, new String[] {apiSpec.get().getName(), apiSpec.get().getDescription()});
		});

		// api들의 200 response의 headers 정보 채우기
		List<ResUsecasePrevResponseDto> prevResponseDtos = apiSpecMongoTempRepository
										.findApiResponseListByIdAndApiIdLIst(SSAFAST_API_SPEC, apiIds);

		// api name, desc & api들의 200 response의 body 정보 채우기
		prevResponseDtos.forEach(prevResponseDto -> {

			prevResponseDto.setApiName(apiNames.get(prevResponseDto.getApiId())[0]);
			prevResponseDto.setDesc(apiNames.get(prevResponseDto.getApiId())[1]);

			List<ApiTestResultResponseDoc> apiResponses = apiSpecService.getApiSpecDetail(prevResponseDto.getApiId())
															.getDocument().getResponse();
			ApiTestForDetailResponseBody apiResponseBody = apiResponses.stream()
															.filter(apiRes -> apiRes.getStatusCode() == 200)
															.collect(Collectors.toList()).get(0).getBody();
			prevResponseDto.setBody(apiResponseBody);
		});

		return prevResponseDtos;
	}

	public List<ResUsecaseSummaryDto> getTestList(Long workspaceId) {
		if(!workspaceRepository.findById(workspaceId).isPresent()) {
			throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
		}

		List<ResUsecaseSummaryDto> usecaseSummarList = new ArrayList<>();

		List<UsecaseEntity> usecaseEntityList = usecaseTestEntityRepository.findAllByWorkspaceId(workspaceId);
		usecaseEntityList.forEach(usecaseEntity -> {
			usecaseSummarList.add(usecaseEntity.toResSummaryDto());
		});

		return usecaseSummarList;
	}

	public ResUsecaseDetailDto getDetailTest(Long usecaseId) {
		Optional<UsecaseEntity> usecaseTestEntity = usecaseTestEntityRepository.findById(usecaseId);
		if(!usecaseTestEntityRepository.findById(usecaseId).isPresent()) {
			throw new CustomException(ErrorCode.USECASETEST_NOT_FOUND);
		}

		UsecaseEntity usecaseTest = usecaseTestEntity.get();

		return ResUsecaseDetailDto.builder()
			.name(usecaseTest.getName())
			.desc(usecaseTest.getDesc())
			.usecaseTest(usecaseTestDocsRepository.findTestById(SSAFAST_USECASE_TEST, usecaseId))
			.build();
	}

	@Transactional
	public void deleteDetailTest(Long usecaseId) {
		if(!usecaseTestEntityRepository.findById(usecaseId).isPresent()) {
			throw new CustomException(ErrorCode.USECASETEST_NOT_FOUND);
		}

		// entity 삭제
		usecaseTestEntityRepository.deleteById(usecaseId);
		
		// document 삭제
		UsecaseDocument document = usecaseTestDocsRepository.findById(SSAFAST_USECASE_TEST);
		document.getUsecaseTest().remove(usecaseId);
		usecaseTestDocsRepository.save(document);
	}
}
