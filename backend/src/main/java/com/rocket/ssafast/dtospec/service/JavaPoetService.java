package com.rocket.ssafast.dtospec.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.lang.model.element.Modifier;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.rocket.ssafast.dtospec.Enum.ContraintType;
import com.rocket.ssafast.dtospec.Enum.JavaType;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.repository.DtoSpecDocumentRepository;
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

	@Value("${mongoid.document.dto}")
	String SSAFAST_DTO;

	private final DtoSpecEntityRepository dtoSpecEntityRepository;

	private final DtoSpecDocumentRepository dtoSpecDocumentRepository;


	public String generateDtoClassCode(Long dtoId) {
		Optional<DtoSpecEntity> dtoSpec = dtoSpecEntityRepository.findById(dtoId);
		if(!dtoSpec.isPresent()) {
			new CustomException(ErrorCode.DTO_NOT_FOUND);
		}

		DtoInfo dtoInfo = dtoSpecDocumentRepository.findById(SSAFAST_DTO).get().getDtos().get(dtoId);

		String packageName = "com.example.dto";

		// 1. Class 생성
		String className = dtoSpec.get().getName();
		TypeSpec.Builder classBuilder = TypeSpec.classBuilder(className)
			.addModifiers(Modifier.PUBLIC)
			.addAnnotation(Getter.class)
			.addAnnotation(NoArgsConstructor.class);

		// 2. Primitive 필드 생성
		dtoInfo.getFields().forEach( field -> {
			String fieldName = field.getKeyName();
			TypeName fieldType;

			if(JavaType.getClassByType(Long.valueOf(field.getType())) == null)
				throw new CustomException(ErrorCode.JAVATYPE_NOT_FOUND);

			if(!field.isItera()) {
				fieldType = JavaType.getClassByType(Long.valueOf(field.getType()));
			} else {
				ClassName list = ClassName.get("java.util", "List");
				fieldType = ParameterizedTypeName.get(list, JavaType.getClassByType(Long.valueOf(field.getType())));
			}

			FieldSpec.Builder fieldBuilder;
			if(field.getConstraints() == null){
				fieldBuilder = FieldSpec.builder(fieldType, fieldName)
					.addModifiers(Modifier.PRIVATE);
			}
			else {
				fieldBuilder = FieldSpec.builder(fieldType, fieldName)
					.addModifiers(Modifier.PRIVATE)
					.addAnnotations(getConstraintAnnotations(field.getConstraints()));
			}

			classBuilder.addField(fieldBuilder.build());
		});

		// 3. Nested Dto 필드 생성
		if(dtoInfo.getNestedDtos() != null) {
			dtoInfo.getNestedDtos().forEach( (nestedDtoId, nestedDtos) -> {

				nestedDtos.forEach(nestedDto -> {
					TypeName fieldType;

					Optional<DtoSpecEntity> nestedDtoSpec = dtoSpecEntityRepository.findById(nestedDtoId);
					if(!nestedDtoSpec.isPresent()) {
						throw new CustomException(ErrorCode.DTO_NOT_FOUND);
					}

					if(!nestedDto.isItera()) {
						fieldType = ClassName.get(packageName, nestedDtoSpec.get().getName());
					} else {
						ClassName list = ClassName.get("java.util", "List");
						fieldType = ParameterizedTypeName.get(list, ClassName.get(packageName, nestedDtoSpec.get().getName()));
					}

					FieldSpec.Builder fieldBuilder;
					if(nestedDto.getConstraints() == null) {
						fieldBuilder = FieldSpec.builder(fieldType, nestedDto.getKeyName())
							.addModifiers(Modifier.PRIVATE);
					}
					else {
						fieldBuilder = FieldSpec.builder(fieldType, nestedDto.getKeyName())
							.addModifiers(Modifier.PRIVATE)
							.addAnnotations(getConstraintAnnotations(nestedDto.getConstraints()));
					}

					classBuilder.addField(fieldBuilder.build());
				});
			});
		}

		// 4. Class 생성
		return JavaFile.builder(packageName, classBuilder.build()).build().toString();
	}

	private List<AnnotationSpec> getConstraintAnnotations(String[] constraints) {
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
