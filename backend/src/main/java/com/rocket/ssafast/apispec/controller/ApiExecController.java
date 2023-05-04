package com.rocket.ssafast.apispec.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.apispec.dto.request.ExecReqMessageDto;
import com.rocket.ssafast.apispec.service.ApiExecService;
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
	ResponseEntity<?> executeAPI(@Valid @RequestBody ExecReqMessageDto execReqMessageDto) {
		try {
			return new ResponseEntity<>(apiExecService.requestAPI(execReqMessageDto), HttpStatus.OK);
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

	@PostMapping("/{id}/test/{user_id}")
	ResponseEntity<?>  testpost(@RequestBody Map<String, String> body, @PathVariable("id") Long id, @PathVariable("user_id") String userId, @RequestParam Long longParam, @RequestParam String stringParam ) {
		String result = "post 성공: "+"id: "+id+", userId: "+userId+", longParams: "+longParam+", strParams:"+stringParam+", body:"+body.get("test");
		Map<String, String> rr = new HashMap<>();
		rr.put("result", result);
		return new ResponseEntity<>(rr, HttpStatus.OK);
	}

	@PutMapping("/{id}/test/{user_id}")
	ResponseEntity<?> testput(@PathVariable("id") Long id, @PathVariable("user_id") String userId, @RequestParam Long longParam, @RequestParam String stringParam ) {
		String r = "post 성공: "+"id: "+id+", userId: "+userId+", longParams: "+longParam+", strParams:"+stringParam;
		return new ResponseEntity<>(r, HttpStatus.OK);
	}

	@DeleteMapping("/{id}/test/{user_id}")
	String testdelete(@PathVariable("id") Long id, @PathVariable("user_id") String userId, @RequestParam Long longParam, @RequestParam String stringParam ) {
		return "delete 성공: "+"id: "+id+", userId: "+userId+", longParams: "+longParam+", strParams:"+stringParam;
	}
}
