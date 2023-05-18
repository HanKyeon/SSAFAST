package com.rocket.ssafast.tmp.dto;

import java.util.ArrayList;
import java.util.List;

import com.rocket.ssafast.tmp.domain.TmpOrder;
import com.rocket.ssafast.tmp.domain.TmpUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TmpUserDto {
	private Long id;
	private String name;
	private int age;
	private TmpAddressDto address;

	// getters and setters
	public TmpUser toEntity() {
		return TmpUser.builder()
			.name(name)
			.age(age)
			.address(address.toEntity())
			.build();
	}
}

