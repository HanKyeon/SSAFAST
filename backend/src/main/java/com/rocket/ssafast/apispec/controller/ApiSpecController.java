package com.rocket.ssafast.apispec.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/api")
public class ApiSpecController {

    @PostMapping
    public ResponseEntity<?> createApiSpec(){
        /*
        * dto 추가하는 것 부터 하고 합시다.
        * */
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
