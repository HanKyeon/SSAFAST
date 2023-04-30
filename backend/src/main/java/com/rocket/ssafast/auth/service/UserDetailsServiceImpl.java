package com.rocket.ssafast.auth.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.user.domain.User;
import com.rocket.ssafast.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email)
			.orElseThrow(() -> new UsernameNotFoundException("유저 없음"));

		if(user != null) {
			UserDetailsImpl userDetails = new UserDetailsImpl(user, null);
			return userDetails;
		}

		return null;
	}
}
