package com.rocket.ssafast.auth.dto.request;

import javax.validation.constraints.NotEmpty;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginReqUserDto {

	@NotEmpty
	private String email;

	@NotEmpty
	private String password;

	@Builder
	public LoginReqUserDto(String email, String password) {
		this.email = email;
		this.password = password;
	}
}
