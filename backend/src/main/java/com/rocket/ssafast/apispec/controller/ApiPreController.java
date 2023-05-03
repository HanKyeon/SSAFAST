package com.rocket.ssafast.apispec.controller;

import com.rocket.ssafast.apispec.service.ApiPreService;
import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.workspace.dto.request.CreateFigmaSectionDto;
import com.rocket.ssafast.workspace.dto.request.CreateWorkspaceDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j//log 객체 자동으로 생성
@RequiredArgsConstructor//final로 선언된 필드들에 대한 생성자를 자동으로 생성
@RestController//@Controller 어노테이션과 달리, @ResponseBody 어노테이션이 자동으로 적용
@RequestMapping("/api/api-pre")
public class ApiPreController {

    private final ApiPreService apiPreService;
    private String SUCCESS = "SUCCESS";

    @GetMapping("/baseurls")
    ResponseEntity<?> getBaseurls(@RequestParam Long workspaceId){
        try {
            return new ResponseEntity<>(apiPreService.getBaseurls(workspaceId), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }

    }

    @GetMapping("/list")
    ResponseEntity<?> getApiPreList(@RequestParam Long workspaceId){
        try {
            return new ResponseEntity<>("", HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }

    }

    @PostMapping("/category")
    public ResponseEntity<?> createCategory(@RequestParam Long workspaceId, @RequestBody HashMap<String,String> category){
        try {
            return new ResponseEntity<>(apiPreService.createCategory(workspaceId, category.get("name")), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @PutMapping("/category/{categoryId}")
    public ResponseEntity<?> updateCategory(@PathVariable Long categoryId, @RequestParam Long workspaceId, @RequestBody HashMap<String,String> category){
        try {
            return new ResponseEntity<>(apiPreService.updateCategory(workspaceId, categoryId, category.get("name")), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @GetMapping("/category/list")
    ResponseEntity<?> getCategoryList(@RequestParam Long workspaceId){
        try {
            return new ResponseEntity<>(apiPreService.getCategoryList(workspaceId), HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }

    }



}
