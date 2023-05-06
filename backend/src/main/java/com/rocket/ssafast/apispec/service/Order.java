package com.rocket.ssafast.apispec.service;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class Order {
	private int id;
	private List<Item> items;

	// getters and setters
}
