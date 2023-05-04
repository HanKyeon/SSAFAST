package com.rocket.ssafast.workspace.service;

import com.rocket.ssafast.apispec.domain.Entity.ApiSpecEntity;
import com.rocket.ssafast.apispec.domain.Entity.CategoryEntity;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.repository.CategoryEntityRepository;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.figma.repository.FigmaTokenRepository;
import com.rocket.ssafast.figma.domain.FigmaToken;
import com.rocket.ssafast.member.domain.Member;
import com.rocket.ssafast.member.repository.MemberRepository;
import com.rocket.ssafast.workspace.domain.Baseurl;
import com.rocket.ssafast.workspace.domain.Workspace;
import com.rocket.ssafast.workspace.domain.WorkspaceMember;
import com.rocket.ssafast.workspace.dto.request.CreateWorkspaceDto;
import com.rocket.ssafast.workspace.dto.request.UpdateWorkspaceDto;
import com.rocket.ssafast.workspace.dto.response.*;
import com.rocket.ssafast.workspace.repository.WorkspaceMemberRepository;
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
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final MemberRepository memberRepository;
    private final FigmaTokenRepository figmaTokenRepository;
    private final CategoryEntityRepository categoryEntityRepository;
    private final ApiSpecRepository apiSpecRepository;


    @Transactional
    public CreatedWorkspaceDto createWorkspace(Long memberId, CreateWorkspaceDto createWorkspaceDto) {
        //입력값 null 검사
        if (createWorkspaceDto.getName() == null || createWorkspaceDto.getFavicon() == null || createWorkspaceDto.getDescription() == null || createWorkspaceDto.getFigmaFileId() == null || createWorkspaceDto.getFigmaFileName() == null
        || createWorkspaceDto.getFigmaAccessToken() == null || createWorkspaceDto.getFigmaRefreshToken() == null) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        //workspace entity로
        Workspace workspace = createWorkspaceDto.toWorkspaceEntity();

        //baseurl 하나씩 추가
        List<Baseurl> baseurls = new ArrayList<>();
        for (String url : createWorkspaceDto.getBaseurls()) {
            baseurls.add(Baseurl.builder().workspace(workspace).url(url).build());
        }

        //baseurl workspace entity에 추가
        workspace.updateBaseurl(baseurls);

        //workspace 저장
        workspaceRepository.save(workspace);

        Optional<Member> leaderOptional = memberRepository.findById(memberId);
        //member 없으면 400
        if(!leaderOptional.isPresent()){
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        Member leader = leaderOptional.get();
        //리더정보 저장
        workspaceMemberRepository.save(WorkspaceMember.builder()
                .isLeader(true)
                .workspace(workspace)
                .member(leader)
                .build()
        );

        //피그마 토큰 중복 확인
        if(!figmaTokenRepository.existsByMemberId(memberId)){
            figmaTokenRepository.save(FigmaToken.builder()
                    .figmaRefresh(createWorkspaceDto.getFigmaRefreshToken())
                    .figmaAccess(createWorkspaceDto.getFigmaAccessToken())
                    .memberId(leader.getId())
                    .build());
        }


        //루트 카테고리 추가
        categoryEntityRepository.save(CategoryEntity.builder()
                        .workspace(workspace)
                        .name("/")
                .build()
        );

        return workspace.toCreatedDto();
    }


    @Transactional
    public WorkspaceListDto getWorkspaceListDto(Long memberId){
        //memberid가 등록되어있는 모든 팀 조회
        List<WorkspaceMember> workspaceMembers = workspaceMemberRepository.findAllByMemberId(memberId);

        //workspace 목록
        List<WorkspaceDto> workspaceDtos = new ArrayList<>();

        for(WorkspaceMember workspaceMember : workspaceMembers) { // 팀정보 하나씩 돌면서 workspaceId랑 name 붙임
            workspaceDtos.add(WorkspaceDto.builder()
                    .id(workspaceMember.getWorkspace().getId())
                    .name(workspaceMember.getWorkspace().getName())
                    .build());
        }
        return WorkspaceListDto.builder().workspaces(workspaceDtos).build();
    }

    @Transactional
    public DetailWorkspaceDto getDetailWorkspace(Long workspaceId){
        //workspace 찾기
        Optional<Workspace> workspace = workspaceRepository.findById(workspaceId);

        //검색 결과 없으면 WORKSPACE_NOT_FOUND
        if(!workspace.isPresent()){
            throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
        }

        //baseurls 셋팅
        List<String> baseurls = new ArrayList<>();
        for(Baseurl baseurl : workspace.get().getBaseurls()){
            baseurls.add(baseurl.getUrl());
        }

        // to Dto
        DetailWorkspaceDto detailWorkspaceDto = workspace.get().toDetailDto();
        detailWorkspaceDto.setBaseurls(baseurls);

        Optional<WorkspaceMember> leader = workspaceMemberRepository.findByWorkspaceIdAndIsLeaderTrue(workspaceId);
        if(!leader.isPresent()){
            throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
        }
        detailWorkspaceDto.setLeaderId(leader.get().getMember().getId());
        detailWorkspaceDto.setFigmaToken(figmaTokenRepository.findByMemberId(detailWorkspaceDto.getLeaderId()).get().toWorkspaceDto());

        return detailWorkspaceDto;
    }

    @Transactional
    public void updateWorkspaceDto(UpdateWorkspaceDto updateWorkspaceDto) {
        //입력값 확인
        if (updateWorkspaceDto.getName() == null || updateWorkspaceDto.getFavicon() == null || updateWorkspaceDto.getDescription() == null || updateWorkspaceDto.getFigmaFileId() == null || updateWorkspaceDto.getFigmaFileName() == null) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
        Optional<Workspace> updateWorkspace = workspaceRepository.findById(updateWorkspaceDto.getId());

        //workspace entity로
        Workspace workspace = updateWorkspaceDto.toEntity();
        //update
        workspaceRepository.save(workspace);

        //workspace 찾기
        Optional<Workspace> updatedWorkspace = workspaceRepository.findById(workspace.getId());

        // to Dto
        DetailWorkspaceDto detailWorkspaceDto = updatedWorkspace.get().toDetailDto();
    }

    @Transactional
    public void deleteWorkspace(Long workspaceId){
        //api 목록 먼저 삭제
        List<CategoryEntity> categoryEntities = categoryEntityRepository.findAllByWorkspaceId(workspaceId);
        for(CategoryEntity categoryEntity : categoryEntities){
            apiSpecRepository.deleteAllByCategoryId(categoryEntity.getId());
        }
        //카테고리 삭제
        categoryEntityRepository.deleteAllByWorkspaceId(workspaceId);
        
        //워크스페이스 삭제
        workspaceRepository.deleteById(workspaceId);
    }

    @Transactional
    public CompleteDto getComplete(Long workspaceId){
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);

        //워크스페이스 있는지 확인. 없으면 400
        if(!workspaceOptional.isPresent()){
            throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
        }

        Workspace workspace = workspaceOptional.get();

        return CompleteDto.builder()
                .totalApiCount(workspace.getTotalApiCount())
                .completeApiCount(workspace.getCompleteApiCount())
                .build();
    }


}
