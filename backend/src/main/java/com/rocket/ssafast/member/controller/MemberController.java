package com.rocket.ssafast.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.member.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;

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
}
