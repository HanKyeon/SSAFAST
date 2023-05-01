package com.rocket.ssafast.auth.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.member.domain.Member;
import com.rocket.ssafast.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new UsernameNotFoundException("유저 없음"));

		if(member != null) {
			UserDetailsImpl userDetails = new UserDetailsImpl(member, null);
			return userDetails;
		}

		return null;
	}
}
