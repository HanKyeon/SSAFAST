package com.rocket.ssafast.apispec.service;

import java.util.Map;

import javax.lang.model.element.Modifier;

import org.bson.json.JsonObject;
import org.springframework.stereotype.Service;

import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.ParameterSpec;
import com.squareup.javapoet.TypeSpec;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class JavaPoetService {

	public JavaFile generateDtoClassCode(String name, Map<String, JsonObject> body) {
		// body.keySet().stream().forEach(key->{
		// 	// DTO
		// 	if (isLong(key)) {
		// 		ParameterSpec pName = ParameterSpec.builder(String.class, )
		// 	}
		// 	// Primitive
		// 	else {
		//
		// 	}
		// });
		TypeSpec dtoClass = TypeSpec.classBuilder(name)
			.addModifiers(Modifier.PUBLIC)
			.build();

		JavaFile javaFile = JavaFile.builder("com.example." + name, dtoClass).build();
		return null;
	}

	public boolean isLong(String key) {
		try {
			Long.parseLong(key);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}
}
