package com.rocket.ssafast.usecase.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.usecase.domain.UsecaseTestDocument;
import com.rocket.ssafast.usecase.domain.element.UsecaseTestInfo;
import com.rocket.ssafast.usecase.dto.request.UsecaseTestDto;
import com.rocket.ssafast.usecase.repository.UsecaseTestDocsRepository;
import com.rocket.ssafast.usecase.repository.UsecaseTestEntityRepository;
import com.rocket.ssafast.workspace.repository.WorkspaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsecaseTestService {

	@Value("${mongoid.document.usecase}")
	String SSAFAST_USECASE_TEST;
	private final UsecaseTestDocsRepository usecaseTestDocsRepository;
	private final UsecaseTestEntityRepository usecaseTestEntityRepository;
	private final WorkspaceRepository workspaceRepository;

	@Transactional
	public void saveUsecaseTest(UsecaseTestDto usecaseTestDto) {
		if(!workspaceRepository.findById(usecaseTestDto.getWorkspaceId()).isPresent()) {
			throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
		}

		// usecase test의 name, description, workspace id RDB 저장
		long id = usecaseTestEntityRepository.save(usecaseTestDto.toEntity()).getId();

		Map<Long, UsecaseTestInfo> usecaseTest = new HashMap<>();
		usecaseTest.put(id, usecaseTestDto.getUsecaseTest());

		usecaseTestDocsRepository.save(
			UsecaseTestDocument.builder()
				.id(SSAFAST_USECASE_TEST)
				.usecaseTset(usecaseTest)
				.build());
	}

}
