package com.rocket.ssafast.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.figma.dto.request.ReqFigmaTokenDto;
import com.rocket.ssafast.figma.service.FigmaTokenService;
import com.rocket.ssafast.member.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;
	private final FigmaTokenService figmaTokenService;

	@GetMapping
	public ResponseEntity<?> getMember(@AuthenticationPrincipal UserDetailsImpl userDetails) {
		try {
			String email = userDetails.getUsername();
			return new ResponseEntity<>(memberService.findByEmail(email), HttpStatus.OK);
		} catch (CustomException e) {
			log.error("error: ", e);
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode ec = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(ec.getMessage(), ec.getHttpStatus());
		}
	}

	@GetMapping("/list")
	public ResponseEntity<?> getMemberList(@RequestParam String email) {
		try {
			return new ResponseEntity<>(memberService.findAllByEmailContaining(email), HttpStatus.OK);
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode ec = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(ec.getMessage(), ec.getHttpStatus());
		}
	}

	@PutMapping("/figma-token")
	public ResponseEntity<?> saveFigmaToken(@AuthenticationPrincipal UserDetailsImpl userDetails,
		@RequestBody ReqFigmaTokenDto reqFigmaTokenDto) {
		try {
			reqFigmaTokenDto.setMemberId(userDetails.getMemberId());
			figmaTokenService.save(reqFigmaTokenDto);
			return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
		} catch (CustomException e) {
			log.error("error: ", e);
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode ec = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(ec.getMessage(), ec.getHttpStatus());
		}
	}

	@GetMapping("/figma-token")
	public ResponseEntity<?> getFigmaToken(@AuthenticationPrincipal UserDetailsImpl userDetails) {
		try {
			return new ResponseEntity<>(figmaTokenService.getFigmaToken(userDetails.getMemberId()), HttpStatus.OK);
		} catch (CustomException e) {
			log.error("error: ", e);
			return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
		} catch (Exception e) {
			log.error("error: ", e);
			ErrorCode ec = ErrorCode.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<>(ec.getMessage(), ec.getHttpStatus());
		}
	}
}
