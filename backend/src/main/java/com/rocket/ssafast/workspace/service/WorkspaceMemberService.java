package com.rocket.ssafast.workspace.service;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.member.domain.Member;
import com.rocket.ssafast.member.repository.MemberRepository;
import com.rocket.ssafast.workspace.domain.Workspace;
import com.rocket.ssafast.workspace.domain.WorkspaceMember;
import com.rocket.ssafast.workspace.dto.request.AddMemberDto;
import com.rocket.ssafast.workspace.dto.response.WorkspaceMemberDto;
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
public class WorkspaceMemberService {
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final WorkspaceRepository workspaceRepository;

    private final MemberRepository memberRepository;

    @Transactional
    public void addMembers(Long workspaceId, AddMemberDto addMemberDto) {
        //workspace 조회
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(workspaceId);

        //없으면 400
        if(!workspaceOptional.isPresent()){
            throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
        }


        Workspace workspace = workspaceOptional.get();
        //member 한 명씩 추가
        for(Long memberId : addMemberDto.getMemberIds()){
            Optional<Member> member = memberRepository.findById(memberId);

            if(!member.isPresent()){
                throw new CustomException(ErrorCode.USER_NOT_FOUND);
            }
            workspaceMemberRepository.save(WorkspaceMember.builder()
                    .member(member.get())
                    .workspace(workspace)
                    .isLeader(false)
                    .build()
            );

        }

    }

    @Transactional
    public List<WorkspaceMemberDto> getWorkspaceMembers(Long workspaceId){
        List<WorkspaceMember> workspaceMembers = workspaceMemberRepository.findAllByWorkspaceId(workspaceId);

        List<WorkspaceMemberDto> resultMembers = new ArrayList<>();
        for(WorkspaceMember workspaceMember : workspaceMembers){
            resultMembers.add(WorkspaceMemberDto.builder()
                    .id(workspaceMember.getId())
                    .name(workspaceMember.getMember().getName())
                    .profileImg(workspaceMember.getMember().getProfileImg())
                    .build()
            );
        }
        return resultMembers;
    }

    @Transactional
    public void deleteWorkspaceMember(Long memberId){
        workspaceMemberRepository.deleteById(memberId);
    }
}
