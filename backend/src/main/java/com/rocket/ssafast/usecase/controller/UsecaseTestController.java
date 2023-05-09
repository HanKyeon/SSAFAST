package com.rocket.ssafast.usecase.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.usecase.dto.request.UsecaseTestDto;
import com.rocket.ssafast.usecase.service.UsecaseTestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/usecase")
@RequiredArgsConstructor
public class UsecaseTestController {

	private final UsecaseTestService usecaseTestService;

	@PostMapping
	ResponseEntity<?> saveUsecaseTest(@RequestBody @Valid UsecaseTestDto usecaseTestDto) {
		try {
			usecaseTestService.saveUsecaseTest(usecaseTestDto);
			return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}
}
