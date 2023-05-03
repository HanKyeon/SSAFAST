package com.rocket.ssafast.workspace.controller;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.workspace.dto.request.AddMemberDto;
import com.rocket.ssafast.workspace.service.WorkspaceMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j//log 객체 자동으로 생성
@RequiredArgsConstructor//final로 선언된 필드들에 대한 생성자를 자동으로 생성
@RestController//@Controller 어노테이션과 달리, @ResponseBody 어노테이션이 자동으로 적용
@RequestMapping("/api/workspace/member")
public class WorkspaceMemberContoller {

    private final WorkspaceMemberService workspaceMemberService;
    private String SUCCESS = "SUCCESS";
    @PostMapping("")
    ResponseEntity<?> addMember(@RequestParam Long workspaceId, @RequestBody AddMemberDto addMemberDto){
        log.debug(addMemberDto.toString());
        try {
            workspaceMemberService.addMembers(workspaceId, addMemberDto);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }

    }

    @GetMapping("")
    ResponseEntity<?> getWorkspaceMembers(@RequestParam Long workspaceId){
        try {
            return new ResponseEntity<>(workspaceMemberService.getWorkspaceMembers(workspaceId), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @DeleteMapping("/{memberId}")
    ResponseEntity<?> deleteWorkspaceMember(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable("memberId") Long memberId, @RequestParam Long workspaceId){
        try {
            workspaceMemberService.deleteWorkspaceMember(workspaceId, userDetails.getMemberId(), memberId);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }
}
