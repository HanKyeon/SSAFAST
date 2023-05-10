package com.rocket.ssafast.apispec.domain.Enum;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.web.multipart.MultipartFile;

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
	MULTIPART_FILE_TYPE("MultipartFile", TypeName.get(MultipartFile.class)),
	DATE_TYPE("Date", TypeName.get(Date.class)),
	LOCAL_DATETIME_TYPE("LocalDateTime", TypeName.get(LocalDateTime.class));

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
