package com.rocket.ssafast.auth.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.user.domain.User;
import com.rocket.ssafast.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;

	// google에서 받은 userReqeust 후처리
	@Override
	@Transactional
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);

		String email = oAuth2User.getAttribute("email");
		String firstName = oAuth2User.getAttribute("given_name");
		String profileImg = oAuth2User.getAttribute("picture");

		Optional<User> findUser = userRepository.findByEmail(email);
		User user = null;

		// sign up
		if(!findUser.isPresent()) {
			user = User.builder()
				.email(email)
				.name(firstName)
				.profileImg(profileImg)
				.build();
			userRepository.save(user);
		} else {
			user = findUser.get();
		}

		return new UserDetailsImpl(user, oAuth2User.getAttributes());
	}
}
