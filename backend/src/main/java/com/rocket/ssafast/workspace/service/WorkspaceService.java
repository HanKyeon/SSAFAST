package com.rocket.ssafast.workspace.service;

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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final MemberRepository memberRepository;
    private final FigmaTokenRepository figmaTokenRepository;


    @Transactional
    public CreatedWorkspaceDto createWorkspace(String userName, CreateWorkspaceDto createWorkspaceDto) {
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

        Optional<Member> leaderOptional = memberRepository.findByEmail(userName);
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

        figmaTokenRepository.save(FigmaToken.builder()
            .figmaRefresh(createWorkspaceDto.getFigmaRefreshToken())
            .figmaAccess(createWorkspaceDto.getFigmaAccessToken())
            .memberId(leader.getId())
            .build());




        return workspaceRepository.save(workspace).toCreatedDto();
    }


    @Transactional
    public WorkspaceListDto getWorkspaceListDto(String memberEmail){
        Member member  = memberRepository.findByEmail(memberEmail).get();

        //memberid가 등록되어있는 모든 팀 조회
        List<WorkspaceMember> workspaceMembers = workspaceMemberRepository.findAllByMemberId(member.getId());

        //workspace 목록
        List<WorkspaceDto> workspaceDtos = new ArrayList<>();

        //dto 결과 없으면
        if(!workspaceDtos.isEmpty()){
            for(WorkspaceMember workspaceMember : workspaceMembers) { // 팀정보 하나씩 돌면서 workspaceId랑 name 붙임
                workspaceDtos.add(WorkspaceDto.builder()
                        .workspaceId(workspaceMember.getWorkspace().getId())
                        .name(workspaceMember.getWorkspace().getName())
                        .build());
            }
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

        return detailWorkspaceDto;
    }

    @Transactional
    public DetailWorkspaceDto updateWorkspaceDto(UpdateWorkspaceDto updateWorkspaceDto) {
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

        //baseurls 셋팅
        List<String> baseurls = new ArrayList<>();
        for(Baseurl baseurl : updatedWorkspace.get().getBaseurls()){
            baseurls.add(baseurl.getUrl());
        }

        // to Dto
        DetailWorkspaceDto detailWorkspaceDto = updatedWorkspace.get().toDetailDto();
        detailWorkspaceDto.setBaseurls(baseurls);

        return detailWorkspaceDto;

    }

    public void deleteWorkspace(Long workspaceId){
        workspaceRepository.deleteById(workspaceId);
    }

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
