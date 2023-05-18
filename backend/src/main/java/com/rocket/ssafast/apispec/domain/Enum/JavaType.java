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

	STRING_TYPE(1L, "String", TypeName.get(String.class)),
	INTEGER_TYPE(2L, "int", TypeName.INT),
	LONG_TYPE(3L, "long", TypeName.LONG),
	FLOAT_TYPE(4L, "float", TypeName.FLOAT),
	DOUBLE_TYPE(5L, "double", TypeName.DOUBLE),
	BOOLEAN_TYPE(6L, "boolean", TypeName.BOOLEAN),
	MULTIPART_FILE_TYPE(7L, "MultipartFile", TypeName.get(MultipartFile.class)),
	DATE_TYPE(8L, "Date", TypeName.get(Date.class)),
	LOCAL_DATETIME_TYPE(9L, "LocalDateTime", TypeName.get(LocalDateTime.class));

	private Long typeNum;

	private String typeName;

	private TypeName className;

	private static final Map<Long, TypeName> BY_TYPENUM =
		Stream.of(values()).collect(
			Collectors.collectingAndThen(
				Collectors.toMap(JavaType::getTypeNum, JavaType::getClassName), Collections::unmodifiableMap));

	public Long getTypeNum() { return this.typeNum; }
	public TypeName getClassName() { return this.className; }

	public static TypeName getClassByType(Long typeNum) { return BY_TYPENUM.get(typeNum); }
}
