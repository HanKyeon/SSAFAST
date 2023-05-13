package com.rocket.ssafast.apispec.controller;

import com.rocket.ssafast.apispec.dto.request.ApiSpecInfoDto;
import com.rocket.ssafast.apispec.repository.ApiSpecRepository;
import com.rocket.ssafast.apispec.service.ApiSpecService;
import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
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
            apiSpecService.createApiSpec(userInfo.getMemberId(),apiSpecInfoDto);
            return new ResponseEntity<>(apiSpecInfoDto, HttpStatus.OK);
        }
        catch(CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Error e){
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @GetMapping("{apiId}")
    public ResponseEntity<?> getApiSpec(Long apiId){
        //api 명세를 한 주인을 찾아야 하네
        try{
            apiSpecService.getApiSpecDetail(apiId);
            return new ResponseEntity<>(apiId, HttpStatus.OK);
        }
        catch (CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Error e){
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }
}
