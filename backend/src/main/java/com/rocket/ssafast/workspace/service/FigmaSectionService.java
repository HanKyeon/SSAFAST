package com.rocket.ssafast.workspace.service;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.figma.dto.response.ResFigmaTokenDto;
import com.rocket.ssafast.figma.repository.FigmaTokenRepository;
import com.rocket.ssafast.member.domain.FigmaToken;
import com.rocket.ssafast.workspace.domain.FigmaSection;
import com.rocket.ssafast.workspace.domain.Workspace;
import com.rocket.ssafast.workspace.dto.request.CreateFigmaSectionDto;
import com.rocket.ssafast.workspace.dto.request.FigmaSectionDto;
import com.rocket.ssafast.workspace.dto.request.UpdateFigmaSectionDto;
import com.rocket.ssafast.workspace.dto.response.FigmaSectionListDto;
import com.rocket.ssafast.workspace.repository.FigmaSectionRepository;
import com.rocket.ssafast.workspace.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FigmaSectionService {
    private final FigmaSectionRepository figmaSectionRepository;
    private final WorkspaceRepository workspaceRepository;
    private final FigmaTokenRepository figmaTokenRepository;
    @Transactional
    public void createFigmaSection(Long workspaceId, CreateFigmaSectionDto createFigmaSectionDto) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);

        if(!workspaceOptional.isPresent()){
            throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
        }

        Workspace workspace = workspaceOptional.get();

        for(FigmaSectionDto figmaSectionDto : createFigmaSectionDto.getFigmaSections()){
            //섹션 입력값 null 검사
            if(figmaSectionDto.getSectionUrl() == null || figmaSectionDto.getSectionId() == null || figmaSectionDto.getName() == null){
                throw new CustomException(ErrorCode.BAD_REQUEST);
            }

            //toEntity
            FigmaSection figmaSection = figmaSectionDto.toEntity();

            //workspace정보 넣고 저장
            figmaSection.updateWorkspace(workspace);
            figmaSectionRepository.save(figmaSection);
        }

    }

    @Transactional
    public void updateFigmaSection(Long workspaceId, UpdateFigmaSectionDto updateFigmaSectionDtos) {
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);

        if(!workspaceOptional.isPresent()){
            throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
        }

        for(FigmaSectionDto updateFigmaSectionDto : updateFigmaSectionDtos.getUpdateFigmaSections()){
            //입력 null 확인
            if(updateFigmaSectionDto.getSectionUrl() == null || updateFigmaSectionDto.getSectionId() == null || updateFigmaSectionDto.getName() == null){
                throw new CustomException(ErrorCode.BAD_REQUEST);
            }

            //jpa 특징으로 update 가능 -> 공부 필요..!
            Optional<FigmaSection> updateFigmaSection = figmaSectionRepository.findById(updateFigmaSectionDto.getId());

            FigmaSection figmaSection = updateFigmaSectionDto.toUpdateEntity();
            figmaSectionRepository.save(figmaSection);
        }

    }

    public FigmaSectionListDto getFigmaSections(Long workspaceId){
        //FigmaSection 전부 가져오기
        List<FigmaSection> figmaSectionList = figmaSectionRepository.findAllByWorkspaceId(workspaceId);

        //결과값 담을 곳
        List<FigmaSectionDto> figmaSectionDtos = new ArrayList<>();

        //하나씩 해야함
        for(FigmaSection figmaSection: figmaSectionList){
            figmaSectionDtos.add(FigmaSectionDto.builder()
                    .id(figmaSection.getId())
                    .sectionUrl(figmaSection.getSectionUrl())
                    .sectionId(figmaSection.getSectionId())
                    .name(figmaSection.getName())
                    .build());
        }
        return FigmaSectionListDto.builder().figmaSections(figmaSectionDtos).build();
    }

    public void deleteFigmaSection(Long figmaSectionId){
        figmaSectionRepository.deleteById(figmaSectionId);
    }

    public ResFigmaTokenDto getFigmaToken(Long leaderId){
        Optional<FigmaToken> figmaTokenOptional = figmaTokenRepository.findByMemberId(leaderId);
        if(!figmaTokenOptional.isPresent()){
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return figmaTokenOptional.get().toResDto();
    }
}
