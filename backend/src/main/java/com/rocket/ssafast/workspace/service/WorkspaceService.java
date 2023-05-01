package com.rocket.ssafast.workspace.service;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.workspace.domain.Baseurl;
import com.rocket.ssafast.workspace.domain.Workspace;
import com.rocket.ssafast.workspace.domain.WorkspaceMember;
import com.rocket.ssafast.workspace.dto.request.CreateWorkspaceDto;
import com.rocket.ssafast.workspace.dto.request.UpdateWorkspaceDto;
import com.rocket.ssafast.workspace.dto.response.CreatedWorkspaceDto;
import com.rocket.ssafast.workspace.dto.response.DetailWorkspaceDto;
import com.rocket.ssafast.workspace.dto.response.WorkspaceDto;
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


    @Transactional
    public CreatedWorkspaceDto createWorkspaceDto(CreateWorkspaceDto createWorkspaceDto) {
        if (createWorkspaceDto.getName() == null || createWorkspaceDto.getFavicon() == null || createWorkspaceDto.getDescription() == null || createWorkspaceDto.getFigmaFileId() == null || createWorkspaceDto.getFigmaFileName() == null) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        //workspace entity로
        Workspace workspace = createWorkspaceDto.toEntity();

        List<Baseurl> baseurls = new ArrayList<>();
        for (String url : createWorkspaceDto.getBaseurls()) {
            baseurls.add(Baseurl.builder().workspace(workspace).url(url).build());
        }

        workspace.updateBaseurl(baseurls);

        return workspaceRepository.save(workspace).toCreatedDto();
    }


    public List<WorkspaceDto> getWorkspaceListDto(Long memberId){
        List<WorkspaceMember> workspaceMembers = workspaceMemberRepository.findAllByMemberId(memberId);

        List<WorkspaceDto> workspaceDtos = new ArrayList<>();

        if(workspaceDtos.isEmpty()){
            throw new CustomException(ErrorCode.INVALID_MEMBER);
        }
        for(WorkspaceMember workspaceMember : workspaceMembers){
            workspaceDtos.add(WorkspaceDto.builder()
                            .workspaceId(workspaceMember.getWorkspace().getId())
                            .name(workspaceMember.getWorkspace().getName())
                            .build());
        }

        return workspaceDtos;
    }

    public DetailWorkspaceDto getDetailWorkspace(Long workspaceId){
        return workspaceRepository.findById(workspaceId).get().toDetailDto();
    }

    @Transactional
    public DetailWorkspaceDto updateWorkspaceDto(UpdateWorkspaceDto updateWorkspaceDto) {
        if (updateWorkspaceDto.getName() == null || updateWorkspaceDto.getFavicon() == null || updateWorkspaceDto.getDescription() == null || updateWorkspaceDto.getFigmaFileId() == null || updateWorkspaceDto.getFigmaFileName() == null) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
        Optional<Workspace> updateWorkspace = workspaceRepository.findById(updateWorkspaceDto.getId());

        //workspace entity로
        Workspace workspace = updateWorkspaceDto.toEntity();

        return workspaceRepository.save(workspace).toDetailDto();
    }
    public String deleteWorkspace(Long workspaceId){
        workspaceRepository.deleteById(workspaceId);
        return "";
    }
}
