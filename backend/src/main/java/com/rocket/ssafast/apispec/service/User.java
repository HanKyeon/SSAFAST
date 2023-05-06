package com.rocket.ssafast.apispec.service;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
public class User {
	private String name;
	private int age;
	private Address address;
	private List<Order> orders;

	// getters and setters
}

