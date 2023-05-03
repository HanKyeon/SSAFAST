package com.rocket.ssafast.apispec.domain.Enum;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.squareup.javapoet.TypeName;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum JavaType {

	STRING_TYPE("String", TypeName.get(String.class)),
	INTEGER_TYPE("int", TypeName.INT),
	LONG_TYPE("long", TypeName.LONG),
	FLOAT_TYPE("float", TypeName.FLOAT),
	DOUBLE_TYPE("double", TypeName.DOUBLE),
	BOOLEAN_TYPE("boolean", TypeName.BOOLEAN),
	FILE_TYPE("File", TypeName.get(File.class)),
	DATE_TYPE("Date", TypeName.get(Date.class)),
	LOCALDATETIME_TYPE("LocalDateTime", TypeName.get(LocalDateTime.class));

	private String typeName;

	private TypeName className;

	private static final Map<String, TypeName> BY_TYPENAME =
		Stream.of(values()).collect(
			Collectors.collectingAndThen(
				Collectors.toMap(JavaType::getTypeName, JavaType::getClassName), Collections::unmodifiableMap));

	public String getTypeName() { return this.typeName; }
	public TypeName getClassName() { return this.className; }

	public static TypeName getClassByType(String typeName) { return BY_TYPENAME.get(typeName); }
}
