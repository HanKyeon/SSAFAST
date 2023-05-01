package com.rocket.ssafast.auth.service;

import java.util.Optional;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.member.domain.Member;
import com.rocket.ssafast.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

	private final MemberRepository userRepository;

	// google에서 받은 userReqeust 후처리
	@Override
	@Transactional
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);

		String email = oAuth2User.getAttribute("email");
		String firstName = oAuth2User.getAttribute("given_name");
		String profileImg = oAuth2User.getAttribute("picture");

		Optional<Member> findUser = userRepository.findByEmail(email);
		Member member = null;

		// sign up
		if(!findUser.isPresent()) {
			member = Member.builder()
				.email(email)
				.name(firstName)
				.profileImg(profileImg)
				.build();
			userRepository.save(member);
		} else {
			member = findUser.get();
		}

		return new UserDetailsImpl(member, oAuth2User.getAttributes());
	}
}
