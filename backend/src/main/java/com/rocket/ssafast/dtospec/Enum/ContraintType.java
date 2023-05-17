package com.rocket.ssafast.dtospec.Enum;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.URL;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ContraintType {
	NOT_NULL("NotNull", NotNull.class),
	MAX("Max", Max.class),
	MIN("Min", Min.class),
	Range("Range", Range.class),
	EMAIL("Email", Email.class),
	NOT_BLANK("NotBlank", NotBlank.class),
	NOT_EMPTY("NotEmpty", NotEmpty.class),
	PATTERN("Pattern", Pattern.class),
	LENGTH("Length", Length.class),
	URL("URL", URL.class);

	private String typeName;
	private Class annotationName;

	private static final Map<String, Class> BY_TYPENAME =
		Stream.of(values()).collect(
			Collectors.collectingAndThen(
				Collectors.toMap(ContraintType::getTypeName, ContraintType::getAnnotationName), Collections::unmodifiableMap));

	public String getTypeName() { return this.typeName; }
	public Class getAnnotationName() { return this.annotationName; }

	public static Class getClassByType(String typeName) { return BY_TYPENAME.get(typeName); }
}
