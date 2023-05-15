package com.rocket.ssafast.apispec.controller;

import com.rocket.ssafast.apispec.dto.request.ApiSpecInfoDto;
import com.rocket.ssafast.apispec.dto.response.DetailApiSpecInfoDto;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.service.ApiSpecService;
import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.member.dto.response.ResMemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/api")
public class ApiSpecController {

    private final ApiSpecService apiSpecService;

    @PostMapping
    public ResponseEntity<?> createApiSpec(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody ApiSpecInfoDto apiSpecInfoDto){
        try{
            apiSpecService.createApiSpec(userInfo.getMemberId(), apiSpecInfoDto);
            return new ResponseEntity<>(apiSpecInfoDto, HttpStatus.OK);
        }
        catch(CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Error e){
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @GetMapping("/{apiId}")
    public ResponseEntity<?> getApiSpec(@PathVariable Long apiId){
        try{
            return new ResponseEntity<>(apiSpecService.getApiSpec(apiId), HttpStatus.OK);
        }
        catch (CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Error e){
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

//    @GetMapping("/{apiId}/detail")
//    public ResponseEntity<?> getApiSpecDetail(Long apiId){
//        try{
//            DetailApiSpecInfoDto result = apiSpecService.getApiSpecDetail(apiId);
//            return new ResponseEntity<>(result, HttpStatus.OK);
//        }
//        catch (CustomException c){
//            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
//        }
//        catch (Error e){
//            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
//        }
//    }

    @PutMapping("/{apiId}")
    public ResponseEntity<?> updateApiSpec(@AuthenticationPrincipal ResMemberDto memberDto, Long apiId, @RequestBody ApiSpecInfoDto apiSpecInfoDto){
        try{
//            ApiSpecInfoDto result = apiSpecService.updateApiSpec(apiId, memberDto.getId(), apiSpecInfoDto);
//            return new ResponseEntity<>(result, HttpStatus.OK);
            return new ResponseEntity<>(apiSpecInfoDto, HttpStatus.OK);
        }
        catch (CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Error e){
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @DeleteMapping("/{apiId}")
    public ResponseEntity<?> deleteApiSpec(@AuthenticationPrincipal ResMemberDto resMemberDto, Long apiId){
        try{
            apiSpecService.deleteApiSpec(apiId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Error e){
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }
}
