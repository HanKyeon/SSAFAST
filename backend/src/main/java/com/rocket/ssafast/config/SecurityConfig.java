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

import com.rocket.ssafast.auth.jwt.JwtAccessDeniedHandler;
import com.rocket.ssafast.auth.jwt.JwtAuthenticationEntryPoint;
import com.rocket.ssafast.auth.jwt.JwtAuthenticationFilter;
import com.rocket.ssafast.auth.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtTokenProvider jwtTokenProvider;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

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
			.antMatchers("/api/user/signup", "/api/auth/login").permitAll() 	// signup permit
			.anyRequest().authenticated()

			.and()
			.headers()
			.frameOptions().sameOrigin();

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
}
