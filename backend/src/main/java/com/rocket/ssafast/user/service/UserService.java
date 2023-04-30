package com.rocket.ssafast.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.user.dto.request.SignUpReqUserDto;
import com.rocket.ssafast.user.dto.response.SignUpResUserDto;
import com.rocket.ssafast.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
	private final UserRepository userRepository;

	@Transactional
	public SignUpResUserDto createUser(SignUpReqUserDto reqUserDto) {
		if (userRepository.findByEmail(reqUserDto.getEmail()).isPresent()) {
			throw new CustomException(ErrorCode.CONFLICT);
		}
		return userRepository.save(reqUserDto.toEntity()).toSignUpUserDto();
	}
}
