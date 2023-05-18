package com.rocket.ssafast.apispec.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.lang.model.element.Modifier;

import org.springframework.stereotype.Service;

import com.rocket.ssafast.apispec.domain.Enum.ContraintType;
import com.rocket.ssafast.apispec.domain.Enum.JavaType;
import com.rocket.ssafast.apispec.dto.request.JavaPoetBodyDto;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.repository.DtoSpecEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.squareup.javapoet.AnnotationSpec;
import com.squareup.javapoet.ClassName;
import com.squareup.javapoet.FieldSpec;
import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.ParameterizedTypeName;
import com.squareup.javapoet.TypeName;
import com.squareup.javapoet.TypeSpec;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class JavaPoetService {

	private final DtoSpecEntityRepository dtoSpecEntityRepository;

	public String generateDtoClassCode(JavaPoetBodyDto javaPoetBodyDto) throws Exception {
		String packageName = "com.example.dto";

		// 1. Class 생성
		String className = javaPoetBodyDto.getName();
		TypeSpec.Builder classBuilder = TypeSpec.classBuilder(className)
			.addModifiers(Modifier.PUBLIC)
			.addAnnotation(Getter.class)
			.addAnnotation(NoArgsConstructor.class);

		// 2. Primitive 필드 생성
		javaPoetBodyDto.getFields().forEach( field -> {
			String fieldName = field.getKey();
			TypeName fieldType;

			if(JavaType.getClassByType(field.getType()) == null)
				throw new CustomException(ErrorCode.JAVATYPE_NOT_FOUND);

			if(!field.getItera()) {
				fieldType = JavaType.getClassByType(field.getType());
			} else {
				ClassName list = ClassName.get("java.util", "List");
				fieldType = ParameterizedTypeName.get(list, JavaType.getClassByType(field.getType()));
			}

			FieldSpec.Builder fieldBuilder = FieldSpec.builder(fieldType, fieldName)
				.addModifiers(Modifier.PRIVATE)
				.addAnnotations(getConstraintAnnotations(field.getConstraints()));

			classBuilder.addField(fieldBuilder.build());
		});

		// 3. Nested Dto 필드 생성
		javaPoetBodyDto.getNestedDtos().forEach( nestedDto -> {
			String fieldName = nestedDto.getKey();
			TypeName fieldType;

			Optional<DtoSpecEntity> dtoSpec = dtoSpecEntityRepository.findById(nestedDto.getType());
			if(!dtoSpec.isPresent()) {
				throw new CustomException(ErrorCode.DTO_NOT_FOUND);
			}

			if(!nestedDto.getItera()) {
				fieldType = ClassName.get(packageName, dtoSpec.get().getName());
			} else {
				ClassName list = ClassName.get("java.util", "List");
				fieldType = ParameterizedTypeName.get(list, ClassName.get(packageName, dtoSpec.get().getName()));
			}

			FieldSpec.Builder fieldBuilder = FieldSpec.builder(fieldType, fieldName)
				.addModifiers(Modifier.PRIVATE)
				.addAnnotations(getConstraintAnnotations(nestedDto.getConstraints()));

			classBuilder.addField(fieldBuilder.build());
		});

		// 4. Class 생성
		return JavaFile.builder(packageName, classBuilder.build()).build().toString();
	}

	private List<AnnotationSpec> getConstraintAnnotations(List<String> constraints) {
		List<AnnotationSpec> annotations = new ArrayList<>();

		for (String constraint : constraints) {
			String[] tokens = constraint.split("\\(");

			String annotationName = tokens[0];

			if(ContraintType.getClassByType(annotationName) == null)
				throw new CustomException(ErrorCode.CONSTRAINT_NOT_FOUND);

			AnnotationSpec.Builder annotationBuilder = AnnotationSpec.builder(ContraintType.getClassByType(annotationName));

			if (tokens.length > 1) {
				String[] keyValues = tokens[1].replace(")", "").split(",");

				for (String keyValue : keyValues) {
					String[] pair = keyValue.split("=");
					String key = pair[0].trim();
					String value = pair[1].trim();
					if(isInteger(value)) {
						annotationBuilder.addMember(key, "$L", Integer.parseInt(value));
					} else {
						annotationBuilder.addMember(key, "$L", value);
					}
				}
			}
			annotations.add(annotationBuilder.build());
		}
		return annotations;
	}

	public boolean isInteger(String value) {
		try {
			Integer.parseInt(value);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
