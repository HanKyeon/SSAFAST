package com.rocket.ssafast.auth.jwt;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.rocket.ssafast.auth.dto.response.TokenDto;
import com.rocket.ssafast.auth.service.RedisService;
import com.rocket.ssafast.auth.service.UserDetailsServiceImpl;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class JwtTokenProvider implements InitializingBean {

	private final UserDetailsServiceImpl userDetailsService;
	private final RedisService redisService;
	private static Key signingKey;
	private static String EMAIL_KEY = "email";

	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.access-token-validity-in-seconds}")
	private Long accessTokenValidityInMilliseconds;

	@Value("${jwt.refresh-token-validity-in-seconds}")
	private Long refreshTokenValidityInMilliseconds;

	// 시크릿 키 설정
	@Override
	public void afterPropertiesSet() throws Exception {
		byte[] secretKeyBytes = Decoders.BASE64.decode(secretKey);
		signingKey = Keys.hmacShaKeyFor(secretKeyBytes);
	}

	@Transactional
	public TokenDto createToken(String email){
		Long now = System.currentTimeMillis();

		String accessToken = Jwts.builder()
			.setHeaderParam("typ", "JWT")
			.setHeaderParam("alg", "HS512")
			.setExpiration(new Date(now + accessTokenValidityInMilliseconds))
			.setSubject("access-token")
			.claim(EMAIL_KEY, email)
			.signWith(signingKey, SignatureAlgorithm.HS512)
			.compact();

		String refreshToken = Jwts.builder()
			.setHeaderParam("typ", "JWT")
			.setHeaderParam("alg", "HS512")
			.setExpiration(new Date(now + refreshTokenValidityInMilliseconds))
			.setSubject("refresh-token")
			.signWith(signingKey, SignatureAlgorithm.HS512)
			.compact();

		return new TokenDto(accessToken, refreshToken);
	}


	// == 토큰으로부터 정보 추출 == //

	public Claims getClaims(String token) {
		try {
			return Jwts.parserBuilder()
				.setSigningKey(signingKey)
				.build()
				.parseClaimsJws(token)
				.getBody();
		} catch (ExpiredJwtException e) { // Access Token
			return e.getClaims();
		}
	}

	public Authentication getAuthentication(String token) {
		try {
			String email = getClaims(token).get(EMAIL_KEY).toString();
			UserDetails userDetailsImpl = userDetailsService.loadUserByUsername(email);
			return new UsernamePasswordAuthenticationToken(userDetailsImpl, "", userDetailsImpl.getAuthorities());
		} catch (UsernameNotFoundException e) {
			throw new CustomException(ErrorCode.USER_NOT_FOUND);
		} catch (Exception e) {
			log.error("error: ", e);
			throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
		}
	}

	public long getTokenExpirationTime(String token) {
		return getClaims(token).getExpiration().getTime();
	}


	// == 토큰 검증 == //
	public boolean validateRefreshToken(String refreshToken){
		try {
			String status = redisService.getValues(refreshToken);
			if (status != null && status.equals("delete")) { // 회원 탈퇴했을 경우
				return false;
			}
			Jwts.parserBuilder()
				.setSigningKey(signingKey)
				.build()
				.parseClaimsJws(refreshToken);
			return true;
		} catch (SignatureException e) {
			log.error("Invalid JWT signature.");
		} catch (MalformedJwtException e) {
			log.error("Invalid JWT token.");
		} catch (ExpiredJwtException e) {
			log.error("Expired JWT token.");
		} catch (UnsupportedJwtException e) {
			log.error("Unsupported JWT token.");
		} catch (IllegalArgumentException e) {
			log.error("JWT claims string is empty.");
		} catch (NullPointerException e){
			log.error("JWT Token is empty.");
		}
		return false;
	}

	// Filter에서 사용
	public boolean validateAccessToken(String accessToken) {
		try {
			if (redisService.getValues(accessToken) != null // NPE 방지
				&& redisService.getValues(accessToken).equals("logout")) { // 로그아웃 했을 경우
				log.debug("logout token");
				return false;
			}
			Jwts.parserBuilder()
				.setSigningKey(signingKey)
				.build()
				.parseClaimsJws(accessToken);
			return true;
		} catch (SignatureException e) {
			log.error("Invalid JWT signature.");
		} catch (MalformedJwtException e) {
			log.error("Invalid JWT token.");
		} catch (ExpiredJwtException e) {
			log.error("Expired JWT token.");
		} catch (UnsupportedJwtException e) {
			log.error("Unsupported JWT token.");
		} catch (IllegalArgumentException e) {
			log.error("JWT claims string is empty.");
		} catch (NullPointerException e){
			log.error("JWT Token is empty.");
		}
		return false;
	}
}
