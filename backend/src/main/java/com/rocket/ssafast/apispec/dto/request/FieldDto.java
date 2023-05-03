package com.rocket.ssafast.apispec.dto.request;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class FieldDto {
	private String key;
	private String type;
	private Boolean itera;
	private Boolean isDto;
	private List<String> constraints;
}