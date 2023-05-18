package com.rocket.ssafast.overload.controller;

import com.rocket.ssafast.apiexec.dto.request.ReqApiExecMessageDto;
import com.rocket.ssafast.apiexec.dto.request.ReqApiTestResultResponseDto;
import com.rocket.ssafast.apiexec.service.ApiExecService;
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
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/overload")
@RequiredArgsConstructor
public class OverloadController {
	private final OverloadService overloadService;
	private final ApiExecService apiExecService;

	@PostMapping("")
	ResponseEntity<?> executeOverload(
//									  @RequestPart(value = "files", required = false) MultipartFile[] files,                // 단건 파일들
//									  @RequestPart(value = "filesArrs", required = false) MultipartFile[][] filesArrs,    // 다건 파일들
//									  @RequestPart(value = "filekeys", required = false) String[] filekeys,                // 단건 파일 키들
//									  @RequestPart(value = "filesArrKeys", required = false) String[] filesArrKeys,        // 다건 파일 키들
									  @Valid @RequestBody ReqApiExecMessageDto reqApiExecMessageDto,
									  @RequestParam Long workspaceId,
									  @RequestParam Long apiId,
									  @RequestParam int duration,
									  @RequestParam int reqSec) {		// json 데이터

		try {
			return new ResponseEntity<>(overloadService.testOverloadTest(reqApiExecMessageDto, null, null, null, null, duration, reqSec, workspaceId, apiId), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (HttpServerErrorException | HttpClientErrorException e) {
				e.printStackTrace();
			ReqApiTestResultResponseDto reqApiTestResultResponseDto = ReqApiTestResultResponseDto.builder()
					.statusCodeValue(e.getStatusCode().value())
					.statusCode(e.getStatusCode().name())
					.body(e.getMessage())
					.build();
			return new ResponseEntity<>(reqApiTestResultResponseDto, HttpStatus.OK);
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}

	@GetMapping("/list")
	ResponseEntity<?> getOverloadList(@RequestParam Long apiId){
		try {
			return new ResponseEntity<>(overloadService.getOverloadList(apiId), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			ErrorCode error = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(error.getMessage(), error.getHttpStatus());
		}
	}


	@GetMapping("/detail")
	ResponseEntity<?> getOverloadDetail(@RequestParam Long testId){
		try {
			return new ResponseEntity<>(overloadService.getOverloadDetail(testId), HttpStatus.OK);
		} catch (CustomException e) {
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
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
		List<Object> certCodes = (List<Object>) map.get("certCodes");
		List<CertCodeDto> certCodeDtos = new ArrayList<>();
		for(int i = 0; i < certCodes.size(); i++){
			Map<String, Object> certCode = (Map<String, Object>) certCodes.get(i);
			certCodeDtos.add(CertCodeDto.builder()
					.code((Integer) certCode.get("code"))
					.baseurlId(new Long((Integer) certCode.get("baseurlId")))
					.build());
		}
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
