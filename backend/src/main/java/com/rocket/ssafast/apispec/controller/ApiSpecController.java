package com.rocket.ssafast.apispec.controller;

import com.rocket.ssafast.apispec.dto.request.ApiSpecInfoDto;
import com.rocket.ssafast.auth.domain.UserDetailsImpl;
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

    @PostMapping
    public ResponseEntity<?> createApiSpec(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody ApiSpecInfoDto apiSpecInfoDto){
        /*
        * dto 추가하는 것 부터 하고 합시다.
        * */
        log.info("user : " + userInfo.getMemberId());
        return new ResponseEntity<>(apiSpecInfoDto, HttpStatus.OK);
    }

    @GetMapping("{apiId}")
    public ResponseEntity<?> getApiSpec(Long apiId){
        return new ResponseEntity<>(apiId, HttpStatus.OK);
    }
}
