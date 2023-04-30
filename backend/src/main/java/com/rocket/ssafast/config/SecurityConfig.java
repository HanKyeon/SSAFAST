package com.rocket.ssafast.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.rocket.ssafast.auth.handler.OAuth2SuccessHandler;
import com.rocket.ssafast.auth.jwt.JwtAccessDeniedHandler;
import com.rocket.ssafast.auth.jwt.JwtAuthenticationEntryPoint;
import com.rocket.ssafast.auth.jwt.JwtAuthenticationFilter;
import com.rocket.ssafast.auth.jwt.JwtTokenProvider;
import com.rocket.ssafast.auth.service.AuthService;
import com.rocket.ssafast.auth.service.PrincipalOauth2UserService;
import com.rocket.ssafast.auth.service.RedisService;
import com.rocket.ssafast.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisService redisService;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final PrincipalOauth2UserService principalOauth2UserService;

	@Bean
	public BCryptPasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// 인터셉터로 요청을 안전하게 보호하는 방법 설정
		http
			// jwt 토큰 사용을 위한 설정
			.csrf().disable()
			.httpBasic().disable()
			.formLogin().disable()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

			// 예외 처리
			.and()
			.exceptionHandling()
			.authenticationEntryPoint(jwtAuthenticationEntryPoint) 		// 401 ERROR
			.accessDeniedHandler(jwtAccessDeniedHandler)				// 403 ERROR

			.and()
			.authorizeRequests()
			.antMatchers("/login","/api/user/signup", "/api/auth/login").permitAll() 	// signup permit
			.anyRequest().authenticated()

			.and()
			.headers()
			.frameOptions().sameOrigin()

			// OAuth2
			.and()
			.oauth2Login()
			.successHandler(new OAuth2SuccessHandler(redisService, jwtTokenProvider))
			.userInfoEndpoint()		// login 성공 후 user 정보 가져옴
			.userService(principalOauth2UserService);	// user 정보 처리

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
}
