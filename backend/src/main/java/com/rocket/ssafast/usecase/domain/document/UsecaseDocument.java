package com.rocket.ssafast.usecase.domain.document;

import java.util.Map;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import com.rocket.ssafast.usecase.domain.document.element.UsecaseInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("usecase_test_docs")
public class UsecaseDocument {
	@Id
	String id;		// ssafast-usecase-test

	Map<Long, UsecaseInfo> usecaseTest;		// key : test id
}
