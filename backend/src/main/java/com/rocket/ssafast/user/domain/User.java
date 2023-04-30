package com.rocket.ssafast.user.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.rocket.ssafast.user.dto.response.SignUpResUserDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "member")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	@Column(name = "name")
	String name;

	@Column(name = "email")
	String email;

	@Column(name = "password")
	String password;

	@Column(name = "profileImg")
	String profileImg;

	public SignUpResUserDto toSignUpUserDto() {
		return SignUpResUserDto.builder()
			.id(id)
			.name(name)
			.email(email)
			.profileImg(profileImg)
			.build();
	}
}
