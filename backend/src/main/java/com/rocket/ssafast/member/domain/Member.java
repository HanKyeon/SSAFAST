package com.rocket.ssafast.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.rocket.ssafast.member.dto.response.ResMemberDto;
import com.rocket.ssafast.member.dto.response.ResMemberSummaryDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "member")
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	@Column(name = "name")
	String name;

	@Column(name = "email")
	String email;

	@Column(name = "profile_img")
	String profileImg;

	public ResMemberDto toResDto() {
		return ResMemberDto.builder()
			.id(id)
			.name(name)
			.email(email)
			.profileImg(profileImg)
			.build();
	}

	public ResMemberSummaryDto toResSummaryDto() {
		return ResMemberSummaryDto.builder()
			.name(name)
			.profileImg(profileImg)
			.build();
	}
}
