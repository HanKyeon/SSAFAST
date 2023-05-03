package com.rocket.ssafast.apispec.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.apispec.dto.request.BodyDto;
import com.rocket.ssafast.apispec.service.JavaPoetService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/dto")
@RequiredArgsConstructor
public class DtoController {

	private final JavaPoetService javaPoetService;

	@GetMapping("/class")
	public ResponseEntity<?> getDtoClassCode(@RequestBody BodyDto bodyDto) {
		try {
			return new ResponseEntity<>(javaPoetService.generateDtoClassCode(bodyDto), HttpStatus.OK);
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(errorCode.getMessage(), errorCode.getHttpStatus());
		}
	}
}
