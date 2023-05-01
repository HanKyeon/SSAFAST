package com.rocket.ssafast.dtospec.controller;

import com.rocket.ssafast.dtospec.service.DtoSpecService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/api/dto")
public class DtoSpecController {

    @Autowired
    DtoSpecService dtoSpecService;

    @GetMapping(value = "/{dtoId}")
    public ResponseEntity<?> getDetailDtoInfo(@PathVariable int dtoId) {
        return ResponseEntity.ok("test");

    }
}
