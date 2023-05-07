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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.rocket.ssafast.auth.handler.OAuth2SuccessHandler;
import com.rocket.ssafast.auth.jwt.JwtAccessDeniedHandler;
import com.rocket.ssafast.auth.jwt.JwtAuthenticationEntryPoint;
import com.rocket.ssafast.auth.jwt.JwtAuthenticationFilter;
import com.rocket.ssafast.auth.jwt.JwtTokenProvider;
import com.rocket.ssafast.auth.service.PrincipalOauth2UserService;
import com.rocket.ssafast.auth.service.RedisService;

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
			.antMatchers("/api/auth/test","/api/auth/login", "/api/auth/reissue").permitAll() 	// signup permit
			.anyRequest().authenticated()

			.and()
			.headers()
			.frameOptions().sameOrigin()

			// // cors 설정 적용
			// .and()
			// .cors().configurationSource(corsConfigurationSource())

			// OAuth2
			.and()
			.oauth2Login()
			.successHandler(new OAuth2SuccessHandler(redisService, jwtTokenProvider))
			.userInfoEndpoint()		// login 성공 후 user 정보 가져옴
			.userService(principalOauth2UserService);	// user 정보 처리

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource(){
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);       // 서버의 json 응답을 JS로 처리가능하게 함
		config.addAllowedOriginPattern("*");    // springboot cors 설정 시, allowCredentials(true)와 allowedOrigin("*") 같이 사용 불가하게 업뎃
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		source.registerCorsConfiguration("/**", config);
		return source;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
}
