package com.rocket.ssafast.dtospec.controller;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.dto.request.UpdateDtoSpecDto;
import com.rocket.ssafast.dtospec.service.DtoSpecDocumentService;
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
@RequestMapping(value = "/api/dto")
public class DtoSpecController {

    private final DtoSpecDocumentService dtoSpecDocumentService;
    @PostMapping
    public ResponseEntity<?> insertDto(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody DtoInfo dtoInfo){
        //dto depth 가 2를 벗어나는지 확인하는 로직 필요 - mysql
        log.info(dtoInfo.toString());
        log.info("id : ", userDetails.getMemberId());
        log.info("email :", userDetails.getUsername());
        try{
            return new ResponseEntity<>(dtoSpecDocumentService.createDtoDocs(dtoInfo), HttpStatus.OK);
        }
        catch (Exception e){
            log.info("error : ", e.getMessage());
        }
        return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
    }

    //수정 필요,,ㅎ,,
    @GetMapping(value = "/{dtoId}")
    public ResponseEntity<?> getDetailDtoInfo(@PathVariable Long dtoId) {
        try{
            return new ResponseEntity<>(dtoSpecDocumentService.findByDtoId(dtoId), HttpStatus.OK);
        } catch (Exception e){
            log.info("error : ", e.getMessage());
        }
        return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());

    }

    @PutMapping(value = "/{dtoId}")
    public ResponseEntity<?> updateDtoInfo(@RequestBody UpdateDtoSpecDto updateDtoSpecDto){
        //dto depth 가 2를 벗어나는지 확인하는 로직 필요 - mysql
        return new ResponseEntity<>(updateDtoSpecDto, HttpStatus.OK);
    }


}
