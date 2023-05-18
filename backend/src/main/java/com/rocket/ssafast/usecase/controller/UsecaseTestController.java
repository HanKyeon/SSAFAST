package com.rocket.ssafast.usecase.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.usecase.domain.document.element.UsecaseInfo;
import com.rocket.ssafast.usecase.dto.request.ReqUsecaseEntityDto;
import com.rocket.ssafast.usecase.dto.response.ResUsecasePrevResponseDto;
import com.rocket.ssafast.usecase.dto.response.ResUsecaseSummaryDto;
import com.rocket.ssafast.usecase.service.UsecaseTestService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/usecase")
@RequiredArgsConstructor
public class UsecaseTestController {

	private final UsecaseTestService usecaseTestService;

	@PostMapping
	ResponseEntity<?> saveUsecaseTest(@RequestBody ReqUsecaseEntityDto reqUsecaseTestEntityDto) {
		try {
			Map<String, Long> result = new HashMap<>();
			result.put("usecaseTestId", usecaseTestService.saveUsecaseTestEntity(reqUsecaseTestEntityDto));
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@PutMapping("/exec")
	ResponseEntity<?> execUsecaseTest(
		@RequestParam("usecaseId") Long usecaseTestId,
		// @RequestPart(value = "files", required = false) MultipartFile[] files,				// 단건 파일들
		// @RequestPart(value = "filesArrs", required = false) MultipartFile[][] filesArrs,	// 다건 파일들
		// @RequestPart(value = "filekeys", required = false) String[] filekeys,				// 단건 파일 키들
		// @RequestPart(value = "filesArrKeys", required = false) String[] filesArrKeys,		// 다건 파일 키들
		@Valid @RequestBody UsecaseInfo usecaseTestInfo) {			// usecase 테스트 정보

		try {
			return new ResponseEntity<>(
				usecaseTestService.execUsecaseTest(
					usecaseTestId, usecaseTestInfo, null, null, null, null
				), HttpStatus.OK);
		} catch (CustomException e) {
			log.error("error: ", e);
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			log.error("error: ", e);
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@GetMapping("/prev-responses")
	ResponseEntity<?> getPrevResponses(@RequestParam("apiIds") List<Long> apiIds) {
		try {
			Map<String, List<ResUsecasePrevResponseDto>> result = new HashMap<>();
			result.put("prevResponses", usecaseTestService.getPrevResponses(apiIds));
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (CustomException e){
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@GetMapping("/list")
	ResponseEntity<?> getTestList(@RequestParam("workspaceId") Long workspaceId) {
		try {
			Map<String, List<ResUsecaseSummaryDto>> result = new HashMap<>();
			result.put("usecaseTestList", usecaseTestService.getTestList(workspaceId));
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (CustomException e){
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@GetMapping("/{usecaseId}")
	ResponseEntity<?> getDetailTest(@PathVariable("usecaseId") Long usecaseId) {
		try {
			return new ResponseEntity<>(usecaseTestService.getDetailTest(usecaseId), HttpStatus.OK);
		} catch (CustomException e){
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@DeleteMapping("/{usecaseId}")
	ResponseEntity<?> deleteDetailTest(@PathVariable("usecaseId") Long usecaseId) {
		try{
			usecaseTestService.deleteDetailTest(usecaseId);
			return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
		} catch (CustomException e){
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}
}
