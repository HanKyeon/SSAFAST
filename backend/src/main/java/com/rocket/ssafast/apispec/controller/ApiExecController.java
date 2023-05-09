package com.rocket.ssafast.apispec.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.apispec.dto.request.ApiExecReqMessageDto;
import com.rocket.ssafast.apispec.dto.request.ApiTestResultDto;
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
	ResponseEntity<?> executeAPI(@Valid @RequestBody ApiExecReqMessageDto apiExecReqMessageDto) {
		try {
			return new ResponseEntity<>(apiExecService.requestAPI(apiExecReqMessageDto), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			if (e.getMessage().equals("CLIENT_ERROR")) {
				Map<String, String> clientError = new HashMap<>();
				clientError.put("errorMessage", e.getCause().getMessage());
				return new ResponseEntity<>(clientError, HttpStatus.OK);
			}
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
			return new ResponseEntity<>(apiExecService.getAPIExecResults(apiId), HttpStatus.OK);
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
			return new ResponseEntity<>(apiExecService.getAPIExecDetailResult(resId), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@PostMapping("/{id}/test/{user_id}")
	ResponseEntity<?>  testpost(@RequestBody TmpUserDto body, @PathVariable("id") Long id, @PathVariable("user_id") String userId, @RequestParam Long longParam, @RequestParam String stringParam ) {
		String result = "post 성공: "+"id: "+id+", userId: "+userId+", longParams: "+longParam+", strParams:"+stringParam+", body:"+body;
		Map<String, String> rr = new HashMap<>();
		rr.put("result", result);
		return new ResponseEntity<>(rr, HttpStatus.OK);
	}
}
