package com.rocket.ssafast.member.dto.response;

import com.rocket.ssafast.member.domain.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResMemberDto {
	long id;
	String name;
	String email;
	String profileImg;

	@Builder
	public ResMemberDto(long id, String name, String email, String profileImg) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.profileImg = profileImg;
	}

	public Member toEntity() {
		return Member.builder()
			.id(id)
			.build();
	}
}
