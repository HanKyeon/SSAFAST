package com.rocket.ssafast.user.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.rocket.ssafast.user.domain.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpReqUserDto {

	@NotEmpty
	String name;

	@Email
	String email;

	String profileImg;

	@Builder
	public SignUpReqUserDto(String name, String email, String password, String profileImg) {
		this.name = name;
		this.email = email;
		this.profileImg = profileImg;
	}

	public User toEntity() {
		return User.builder()
			.name(name)
			.email(email)
			.profileImg(profileImg)
			.build();
	}
}
