package com.rocket.ssafast.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignUpResUserDto {
	long id;
	String name;
	String email;
	String profileImg;

	@Builder
	public SignUpResUserDto(long id, String name, String email, String profileImg) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.profileImg = profileImg;
	}
}
