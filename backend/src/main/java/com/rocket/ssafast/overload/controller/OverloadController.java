package com.rocket.ssafast.overload.controller;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.overload.dto.request.CertCodeDto;
import com.rocket.ssafast.overload.dto.request.OverloadExecDto;
import com.rocket.ssafast.overload.service.OverloadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/overload")
@RequiredArgsConstructor
public class OverloadController {
	private final OverloadService overloadService;

	@PostMapping
	ResponseEntity<?> executeOverload(@Valid @RequestBody OverloadExecDto overloadExecDto) {
		try {
			return new ResponseEntity<>(overloadService.requestOverload(overloadExecDto), HttpStatus.OK);
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

	@GetMapping("/baseurl")
	ResponseEntity<?> checkBaseurl(@RequestParam Long workspaceId){
		try {
			return new ResponseEntity<>(overloadService.checkBaseurl(workspaceId), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@GetMapping("/cert")
	ResponseEntity<?> sendCertCode(@RequestParam Long workspaceId){
		try {
			overloadService.sendCertCode(workspaceId);
			return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@PostMapping("/cert")
	ResponseEntity<?> checkCertCode(@RequestBody HashMap<String, Object> map){
		List<CertCodeDto> certCodeDtos = (List<CertCodeDto>) map.get("certCodes");
		try {
			return new ResponseEntity<>(overloadService.checkCertCode(certCodeDtos), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

}
