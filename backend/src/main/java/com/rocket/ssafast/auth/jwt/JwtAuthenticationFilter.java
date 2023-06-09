package com.rocket.ssafast.auth.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.OncePerRequestFilter;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;

import io.jsonwebtoken.IncorrectClaimException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		// access token 추출
		String accessToken = resolveToken(request);

		// 토큰 유효성 검사
		try {
			if(accessToken != null && jwtTokenProvider.validateAccessToken(accessToken)) {
				Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
				SecurityContextHolder.getContext().setAuthentication(authentication);
				log.debug("Save authentication in SecurityContextHolder");
			}
		} catch (IncorrectClaimException e) {
			SecurityContextHolder.clearContext();
			log.debug("Invalid JWT token");
			response.sendError(401, "UNAUTHORIZED");
		} catch (UsernameNotFoundException e) {
			SecurityContextHolder.clearContext();
			log.debug("Can't find user");
			response.sendError(401, "UNAUTHORIZED");
		} catch (Exception e) {
			log.debug("error: ", e);
			response.sendError(500, "INTERNAL SERVER ERROR");
		}
		filterChain.doFilter(request, response);
	}

	public String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}
}
