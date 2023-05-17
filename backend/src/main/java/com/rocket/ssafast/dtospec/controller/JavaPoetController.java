package com.rocket.ssafast.dtospec.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.dtospec.service.JavaPoetService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/dto")
@RequiredArgsConstructor
public class JavaPoetController {
	private final JavaPoetService javaPoetService;

	@GetMapping("/class")
	public ResponseEntity<?> getDtoClassCode(@RequestParam("dtoId") Long dtoId) {
		try {
			String dtoClass = javaPoetService.generateDtoClassCode(dtoId);
			Map<String, String> result = new HashMap<>();
			result.put("dtoClass", dtoClass);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(errorCode.getMessage(), errorCode.getHttpStatus());
		}
	}
}
