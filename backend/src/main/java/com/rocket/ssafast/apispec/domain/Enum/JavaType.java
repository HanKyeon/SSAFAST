package com.rocket.ssafast.apispec.domain.Enum;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum JavaType {

	STRING_TYPE("String", String.class),
	INTEGER_TYPE("int", Integer.class),
	LONG_TYPE("long", Long.class),
	FLOAT_TYPE("float", Float.class),
	DOUBLE_TYPE("double", Double.class),
	BOOLEAN_TYPE("boolean", Boolean.class),
	FILE_TYPE("File", File.class),
	DATE_TYPE("Date", Date.class),
	LOCALDATETIME_TYPE("LocalDateTime", LocalDateTime.class);

	private String typeName;

	private Class className;

	private static final Map<String, Class> BY_TYPENAME =
		Stream.of(values()).collect(
			Collectors.collectingAndThen(
				Collectors.toMap(JavaType::getTypeName, JavaType::getClassName), Collections::unmodifiableMap));

	public String getTypeName() { return this.typeName; }
	public Class getClassName() { return this.className; }

	public static Class getClassByType(String typeName) { return BY_TYPENAME.get(typeName); }
}
