package com.rocket.ssafast.apispec.dto.request.temp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class Address {
	private String street;
	private String city;
	private String state;

	// getters and setters
}
