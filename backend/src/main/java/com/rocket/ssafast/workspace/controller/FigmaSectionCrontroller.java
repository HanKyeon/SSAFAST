package com.rocket.ssafast.workspace.controller;

import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.workspace.dto.request.CreateFigmaSectionDto;
import com.rocket.ssafast.workspace.dto.request.UpdateFigmaSectionDto;
import com.rocket.ssafast.workspace.service.FigmaSectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j//log 객체 자동으로 생성
@RequiredArgsConstructor//final로 선언된 필드들에 대한 생성자를 자동으로 생성
@RestController//@Controller 어노테이션과 달리, @ResponseBody 어노테이션이 자동으로 적용
@RequestMapping("/api/workspace/figma-section")
public class FigmaSectionCrontroller {

    private final FigmaSectionService figmaSectionService;
    private String SUCCESS = "SUCCESS";
    @PostMapping("")
    public ResponseEntity<?> createFigmaSection(@RequestParam Long workspaceId, @RequestBody CreateFigmaSectionDto createFigmaSectionDto){
        try {
            figmaSectionService.createFigmaSection(workspaceId, createFigmaSectionDto);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @PutMapping("")
    public ResponseEntity<?> updateFigmaSection(@RequestParam Long workspaceId, @RequestBody UpdateFigmaSectionDto updateFigmaSectionDtos){
        try {
            figmaSectionService.updateFigmaSection(workspaceId, updateFigmaSectionDtos);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getFigmaSections(@RequestParam Long workspaceId){
        try {
            return new ResponseEntity<>(figmaSectionService.getFigmaSections(workspaceId), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @DeleteMapping("/{figmaSectionId}")
    public ResponseEntity<?> deleteFigma(@PathVariable("figmaSectionId") Long figmaSectionId){
        try {
            figmaSectionService.deleteFigmaSection(figmaSectionId);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
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
