package com.rocket.ssafast.tmp.dto;

import com.rocket.ssafast.tmp.domain.TmpAddress;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TmpAddressDto {
	private Long id;
	private String street;
	private String city;
	private String state;

	// getters and setters
	public TmpAddress toEntity() {
		return TmpAddress.builder()
			.city(city)
			.state(state)
			.street(street)
			.build();
	}
}
