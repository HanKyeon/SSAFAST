package com.rocket.ssafast.apispec.controller;

import com.rocket.ssafast.apispec.service.FigmaSectionApiService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Slf4j//log 객체 자동으로 생성
@RequiredArgsConstructor//final로 선언된 필드들에 대한 생성자를 자동으로 생성
@RestController//@Controller 어노테이션과 달리, @ResponseBody 어노테이션이 자동으로 적용
@RequestMapping("/api/api-pre/figma-section")
public class ApiFigmaSectionController {

    private FigmaSectionApiService figmaSectionApiService;
    private String SUCCESS = "SUCCESS";
    @PostMapping("")
    public ResponseEntity<?> createApiFigmaSection(@RequestParam Long figmaSectionId, @RequestBody HashMap<String, List<Long>> apiIds){
        try {
            figmaSectionApiService.createApiFigmaSection(figmaSectionId, apiIds);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        } catch (Exception e) {
            log.error("error: ", e);
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }
}
