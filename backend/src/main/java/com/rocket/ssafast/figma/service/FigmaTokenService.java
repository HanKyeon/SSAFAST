package com.rocket.ssafast.figma.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.member.domain.FigmaToken;
import com.rocket.ssafast.figma.dto.request.ReqFigmaTokenDto;
import com.rocket.ssafast.figma.dto.response.ResFigmaTokenDto;
import com.rocket.ssafast.figma.repository.FigmaTokenRepository;
import com.rocket.ssafast.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FigmaTokenService {

	private final FigmaTokenRepository figmaTokenRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public void save(ReqFigmaTokenDto reqFigmaTokenDto) {
		long memberId = reqFigmaTokenDto.getMemberId();
		if(!memberRepository.findById(reqFigmaTokenDto.getMemberId()).isPresent()) {
			throw new CustomException(ErrorCode.USER_NOT_FOUND);
		}
		Optional<FigmaToken> figmaTokenOption = figmaTokenRepository.findByMemberId(memberId);
		if(figmaTokenOption.isPresent()) {
			reqFigmaTokenDto.setId(figmaTokenOption.get().getId());
		}
		figmaTokenRepository.save(reqFigmaTokenDto.toEntity());
	}

	public ResFigmaTokenDto getFigmaToken(long memberId) {
		if(!memberRepository.findById(memberId).isPresent()) {
			throw new CustomException(ErrorCode.USER_NOT_FOUND);
		}
		Optional<FigmaToken> figmaTokenOption = figmaTokenRepository.findByMemberId(memberId);
		if(!figmaTokenOption.isPresent()) {
			throw new CustomException(ErrorCode.FIGMA_TOKEN_NOT_FOUND);
		}
		return figmaTokenOption.get().toResDto();
	}
}
