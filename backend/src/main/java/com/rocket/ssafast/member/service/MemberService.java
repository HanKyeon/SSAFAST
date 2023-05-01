package com.rocket.ssafast.member.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.member.domain.Member;
import com.rocket.ssafast.member.dto.response.ResMemberDto;
import com.rocket.ssafast.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
	private final MemberRepository memberRepository;

	public ResMemberDto findByEmail(String email) {
		Optional<Member> member = memberRepository.findByEmail(email);
		if (!member.isPresent()) {
			throw new CustomException(ErrorCode.USER_NOT_FOUND);
		}
		return member.get().toResMemberDto();
	}

	public List<ResMemberDto> findAllByEmailContaining(String email) {
		List<Member> memberEntitis = memberRepository.findByEmailContaining(email);
		List<ResMemberDto> memberDtos = new ArrayList<>();
		for(Member member : memberEntitis) {
			memberDtos.add(member.toResMemberDto());
		}
		return memberDtos;
	}
}
