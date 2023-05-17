package com.rocket.ssafast.dtospec.dto.request;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JavaPoetBodyDto {
	String name;
	List<JavaPoetFieldDto> fields;
	List<JavaPoetFieldDto> nestedDtos;
}
