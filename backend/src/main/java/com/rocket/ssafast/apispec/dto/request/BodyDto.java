package com.rocket.ssafast.apispec.dto.request;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BodyDto {
	String name;

	List<FieldDto> fields;
}
