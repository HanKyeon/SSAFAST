package com.rocket.ssafast.dtospec.controller;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.domain.element.FieldDtoInfo;
import com.rocket.ssafast.dtospec.dto.request.AddDtoSpecDto;
import com.rocket.ssafast.dtospec.dto.request.UpdateDtoSpecDto;
import com.rocket.ssafast.dtospec.dto.response.ResponseDtoListItem;
import com.rocket.ssafast.dtospec.service.DtoSpecDocumentService;
import com.rocket.ssafast.dtospec.service.DtoSpecEntityService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.member.dto.response.ResMemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/dto")
public class DtoSpecController {

    private final DtoSpecEntityService dtoSpecEntityService;
    private final DtoSpecDocumentService dtoSpecDocumentService;
    @PostMapping
    public ResponseEntity<?> insertDto(@RequestBody AddDtoSpecDto addDtoSpecDto){

        try{
            return new ResponseEntity<>(dtoSpecEntityService.createDtoEntity(addDtoSpecDto), HttpStatus.OK);
        }
        catch (CustomException customException){
            return new ResponseEntity<>(customException.getMessage(), customException.getHttpStatus());
        }
        catch (IllegalArgumentException illegalArgumentException){
            return new ResponseEntity<>(ErrorCode.BAD_REQUEST.getMessage(), ErrorCode.BAD_REQUEST.getHttpStatus());
        }
        catch (Exception e){
            log.info("error : " + e.getMessage());
            e.printStackTrace();
        }
        return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
    }

    @GetMapping(value = "/{dtoId}")
    public ResponseEntity<?> getDetailDtoInfo(@PathVariable Long dtoId) {
        try{
            return new ResponseEntity<>(dtoSpecEntityService.getDtoSpecEntity(dtoId), HttpStatus.OK);
        }
        catch (CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Exception e){
            log.info("error : ", e.getMessage());
            e.printStackTrace();
        }
        return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());

    }

    @GetMapping(value = "/list")
    public ResponseEntity<?> getDtoLists(@RequestParam Long workspaceId){
        try{
            Map<String, List<ResponseDtoListItem>> results = new HashMap<>();
            results.put("dtoList", dtoSpecEntityService.getDtoListByWorkspaceId(workspaceId));
            return new ResponseEntity<>(results, HttpStatus.OK);
        }
        catch (CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Error e){
            log.info("error : " + e.getMessage());
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @PutMapping(value = "/{dtoId}")
    public ResponseEntity<?> updateDtoInfo(@AuthenticationPrincipal UserDetailsImpl memberDto, @PathVariable Long dtoId, @RequestBody AddDtoSpecDto updateDtoSpecDto){
        try{
//            return new ResponseEntity<>(updateDtoSpecDto, HttpStatus.OK);
            return new ResponseEntity<>(dtoSpecEntityService.checkInputBeforeUpdateEntityAndUpdate(memberDto.getMemberId(), dtoId, updateDtoSpecDto), HttpStatus.OK);
        }
        catch (CustomException customException){
            customException.printStackTrace();
            return new ResponseEntity<>(customException.getMessage(), customException.getHttpStatus());
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

    @DeleteMapping(value = "/{dtoId}")
    public ResponseEntity<?> deleteDtoInfo(@AuthenticationPrincipal UserDetailsImpl member, @PathVariable Long dtoId){
        try{
            return new ResponseEntity<>(dtoId, HttpStatus.OK);
        }
        catch (CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Exception e){
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }


}
