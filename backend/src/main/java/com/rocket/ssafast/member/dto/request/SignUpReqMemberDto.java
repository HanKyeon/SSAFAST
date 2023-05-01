package com.rocket.ssafast.member.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.rocket.ssafast.member.domain.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpReqMemberDto {

	@NotEmpty
	String name;

	@Email
	String email;

	String profileImg;

	@Builder
	public SignUpReqMemberDto(String name, String email, String password, String profileImg) {
		this.name = name;
		this.email = email;
		this.profileImg = profileImg;
	}

	public Member toEntity() {
		return Member.builder()
			.name(name)
			.email(email)
			.profileImg(profileImg)
			.build();
	}
}
