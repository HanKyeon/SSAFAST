package com.rocket.ssafast.apispec.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.multipart.MultipartFile;

import com.rocket.ssafast.apispec.dto.request.ApiExecReqMessageDto;
import com.rocket.ssafast.apispec.dto.request.ApiTestResultDto;
import com.rocket.ssafast.apispec.dto.request.ApiTestResultResponseDto;
import com.rocket.ssafast.apispec.dto.response.ApiTestResultSummaryDto;
import com.rocket.ssafast.apispec.service.ApiExecService;
import com.rocket.ssafast.tmp.dto.TmpUserDto;
import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/api-exec")
@RequiredArgsConstructor
public class ApiExecController {
	private final ApiExecService apiExecService;

	@PostMapping
	ResponseEntity<?> executeAPI(
		@RequestPart(value = "files", required = false) MultipartFile[] files,				// 단건 파일들
		@RequestPart(value = "filesArrs", required = false) MultipartFile[][] filesArrs,	// 다건 파일들
		@RequestPart(value = "filekeys", required = false) String[] filekeys,				// 단건 파일 키들
		@RequestPart(value = "filesArrKeys", required = false) String[] filesArrKeys,		// 다건 파일 키들
		@Valid @RequestPart("execReqData") ApiExecReqMessageDto apiExecReqMessageDto) {		// json 데이터

		try {
			return new ResponseEntity<>(apiExecService.requestAPI(apiExecReqMessageDto, files, filesArrs, filekeys, filesArrKeys), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (HttpServerErrorException | HttpClientErrorException e) {

			ApiTestResultResponseDto apiTestResultResponseDto = ApiTestResultResponseDto.builder()
				.statusCodeValue(e.getStatusCode().value())
				.statusCode(e.getStatusCode().name())
				.body(e.getMessage())
				.build();
			return new ResponseEntity<>(apiTestResultResponseDto, HttpStatus.OK);
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@PostMapping("/response")
	ResponseEntity<?> saveAPIExecResult(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody ApiTestResultDto apiTestResultDto) {
		try {
			apiTestResultDto.setMember(userDetails.getMember().toResDto());
			apiExecService.saveApiTestResult(apiTestResultDto);
			return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@GetMapping("/response/list")
	ResponseEntity<?> getAPIExecResults(@RequestParam Long apiId) {
		try {
			Map<String, List<ApiTestResultSummaryDto>> result = new HashMap<>();
			result.put("resultList", apiExecService.getAPIExecResults(apiId));
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@GetMapping("/response")
	ResponseEntity<?> getAPIExecDetailResult(@RequestParam Long resId) {
		try {
			Map<String, Map<String, Object>> result = new HashMap<>();
			result.put("result", apiExecService.getAPIExecDetailResult(resId));
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@PostMapping("/{id}/test/json/{user_id}")
	ResponseEntity<?>  testjson(@RequestBody TmpUserDto body, @PathVariable("id") Long id, @PathVariable("user_id") String userId, @RequestParam Long longParam, @RequestParam String stringParam ) {
		String result = "post 성공: "+"id: "+id+", userId: "+userId+", longParams: "+longParam+", strParams:"+stringParam+", body:"+body;
		Map<String, String> rr = new HashMap<>();
		rr.put("result", result);
		return new ResponseEntity<>(rr, HttpStatus.OK);
	}

	@PostMapping("/{id}/test/json-multipart/{user_id}")
	ResponseEntity<?>  testJsonMultiPart(@RequestPart(value = "file1", required = false) MultipartFile file1 ,@RequestPart(value = "user") TmpUserDto body, @PathVariable("id") Long id, @PathVariable("user_id") String userId, @RequestParam Long longParam, @RequestParam String stringParam ) {
		String result = "post 성공: "+"id: "+id+", userId: "+userId+", longParams: "+longParam+", strParams:"+stringParam+", body:"+body;
		if(file1 != null) {
			result += ", file1 :"+file1.getOriginalFilename();
		}
		Map<String, String> rr = new HashMap<>();
		rr.put("result", result);
		return new ResponseEntity<>(rr, HttpStatus.OK);
	}

	@PostMapping("/{id}/test/multipart/{user_id}")
	ResponseEntity<?>  testMultipart(@RequestParam(value = "file1") MultipartFile file1, @PathVariable("id") Long id, @PathVariable("user_id") String userId, @RequestParam Long longParam, @RequestParam String stringParam ) {
		String result = "post 성공: "+"id: "+id+", userId: "+userId+", longParams: "+longParam+", strParams:"+stringParam;
		if(file1 != null) {
			result += ", file1 :"+file1.getOriginalFilename();
		}
		Map<String, String> rr = new HashMap<>();
		rr.put("result", result);
		return new ResponseEntity<>(rr, HttpStatus.OK);
	}
}
