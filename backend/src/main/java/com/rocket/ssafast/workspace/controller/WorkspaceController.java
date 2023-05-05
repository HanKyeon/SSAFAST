package com.rocket.ssafast.workspace.controller;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.workspace.dto.request.CreateWorkspaceDto;
import com.rocket.ssafast.workspace.dto.request.UpdateWorkspaceDto;
import com.rocket.ssafast.figma.service.FigmaSectionService;
import com.rocket.ssafast.workspace.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j//log 객체 자동으로 생성
@RequiredArgsConstructor//final로 선언된 필드들에 대한 생성자를 자동으로 생성
@RestController//@Controller 어노테이션과 달리, @ResponseBody 어노테이션이 자동으로 적용
@RequestMapping("/api/workspace/project")
public class WorkspaceController {
    private final WorkspaceService workspaceService;
    private final FigmaSectionService figmaSectionService;
    private String SUCCESS = "SUCCESS";

    @PostMapping
    ResponseEntity<?> createWorkspace(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody CreateWorkspaceDto createWorkspaceDto){
        try {
            return new ResponseEntity<>(workspaceService.createWorkspace(userDetails.getMemberId(), createWorkspaceDto), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }

    }

    @GetMapping("/list")
    ResponseEntity<?> getWorkspaceList(@AuthenticationPrincipal UserDetailsImpl userDetails){
        try {
            return new ResponseEntity<>(workspaceService.getWorkspaceListDto(userDetails.getMemberId()), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @GetMapping("")
    ResponseEntity<?> getWorkspace(@RequestParam Long workspaceId){
        try {
            return new ResponseEntity<>(workspaceService.getDetailWorkspace(workspaceId), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @PutMapping("")
    ResponseEntity<?> updateWorkspace(@RequestParam Long workspaceId, @RequestBody UpdateWorkspaceDto updateWorkspaceDto){
        updateWorkspaceDto.setId(workspaceId);
        try {
            workspaceService.updateWorkspaceDto(updateWorkspaceDto);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }

    }

    @DeleteMapping("")
    ResponseEntity<?> deleteWorkspace(@RequestParam Long workspaceId){
        try {
            workspaceService.deleteWorkspace(workspaceId);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @GetMapping("/complete")
    ResponseEntity<?> getComplete(@RequestParam Long workspaceId){
        try {
            return new ResponseEntity<>(workspaceService.getComplete(workspaceId), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @GetMapping("/token")
    public ResponseEntity<?> getFigmaToken(@RequestParam Long leaderId){
        try {
            return new ResponseEntity<>(figmaSectionService.getFigmaToken(leaderId), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }
}
