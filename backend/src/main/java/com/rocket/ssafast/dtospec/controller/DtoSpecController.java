package com.rocket.ssafast.dtospec.controller;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.dto.request.AddDtoSpecDto;
import com.rocket.ssafast.dtospec.dto.request.UpdateDtoSpecDto;
import com.rocket.ssafast.dtospec.service.DtoSpecDocumentService;
import com.rocket.ssafast.dtospec.service.DtoSpecEntityService;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

        //check dto depth over 2
        Map<Long, DtoInfo> nestedDtoExists = addDtoSpecDto.getDocument().getNestedDtos();
        boolean hasChild = nestedDtoExists!=null || nestedDtoExists.size()>0;

        if(hasChild){
            for(Map.Entry<Long, DtoInfo> entries : nestedDtoExists.entrySet()){
                Long key = entries.getKey();
                DtoInfo dto = entries.getValue();
                //nested dto has children
                if(dtoSpecEntityService.childDtoIsExist(key) || dto.getNestedDtos()!=null){
                    return new ResponseEntity<>(ErrorCode.DTO_DEPTH_OVER.getMessage(), ErrorCode.DTO_DEPTH_OVER.getHttpStatus());
                }
            }
        }

        try{
            //1. mysql input data
            Long dtoEntityId = dtoSpecEntityService.createDtoEntity(addDtoSpecDto, hasChild);

            //2. make dto document object
            DtoInfo dtoInfo =
                    DtoInfo.builder().
                            fields(addDtoSpecDto.getDocument().getFields()).
                            nestedDtos(addDtoSpecDto.getDocument().getNestedDtos()).
                            build();
            return new ResponseEntity<>(dtoSpecDocumentService.createDtoDocs(dtoEntityId, dtoInfo), HttpStatus.OK);
        }
        catch (IllegalArgumentException illegalArgumentException){
            return new ResponseEntity<>(ErrorCode.BAD_REQUEST.getMessage(), ErrorCode.BAD_REQUEST.getHttpStatus());
        }
        catch (Exception e){
            log.info("error : " + e.getMessage());
//            e.printStackTrace();
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
    public ResponseEntity<?> updateDtoInfo(@PathVariable Long dtoId, @RequestBody UpdateDtoSpecDto updateDtoSpecDto){
        //dto depth 가 2를 벗어나는지 확인하는 로직 필요 - mysql

        return new ResponseEntity<>(updateDtoSpecDto, HttpStatus.OK);
    }


}
