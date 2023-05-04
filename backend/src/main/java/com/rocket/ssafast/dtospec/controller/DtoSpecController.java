package com.rocket.ssafast.dtospec.controller;

import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.service.DtoSpecService;
import com.rocket.ssafast.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/dto")
public class DtoSpecController {

    private final DtoSpecService dtoSpecService;

    //수정 필요,,ㅎ,,
    @GetMapping(value = "/{dtoId}")
    public ResponseEntity<?> getDetailDtoInfo(@PathVariable Long dtoId) {
        try{
            return new ResponseEntity<>(dtoSpecService.findByDtoId(dtoId), HttpStatus.OK);
        } catch (Exception e){
            log.debug("error : ", e.getMessage());
        }
        return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());

    }

    @PostMapping
    public ResponseEntity<?> insertDto(@RequestBody DtoInfo dtoInfo){
        try{
            return new ResponseEntity<>(dtoSpecService.createDtoDocs(dtoInfo), HttpStatus.OK);
        }
        catch (Exception e){
            log.debug("error : ", e.getMessage());
        }
        return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
    }
}
