package com.rocket.ssafast.dtospec.dto.request;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class JavaPoetFieldDto {
	private String key;
	private Long type;
	private Boolean itera;
	private List<String> constraints;
}