package com.rocket.ssafast.dtospec.controller;

import com.rocket.ssafast.auth.domain.UserDetailsImpl;
import com.rocket.ssafast.dtospec.domain.DtoSpecEntity;
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
            return new ResponseEntity<>(dtoSpecEntityService.getDtoListByWorkspaceId(workspaceId), HttpStatus.OK);
        }
        catch (CustomException c){
            return new ResponseEntity<>(c.getMessage(), c.getHttpStatus());
        }
        catch (Error e){
            log.info("error : " + e.getMessage());
            return new ResponseEntity<>(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
        }
    }

//    @PutMapping(value = "/{dtoId}")
//    public ResponseEntity<?> updateDtoInfo(@PathVariable Long dtoId, @RequestBody UpdateDtoSpecDto updateDtoSpecDto){
//        try{
//            boolean hasParent = false;
//            boolean hasChild = false;
//            //1. get entity for check relation for other dtos(parent, child info)
//            DtoSpecEntity dtoSpecEntity = dtoSpecEntityService.getDtoSpecEntityById(dtoId);
//
//            Map<Long, DtoInfo> childDto = updateDtoSpecDto.getDocument().getNestedDtos();
//            hasParent = dtoSpecEntity.isHasParent();
//            hasChild = childDto!=null || childDto.size() > 0;
//
//            //child has child
//            for(Long childKey : childDto.keySet()){
//                if(dtoSpecEntityService.childDtoIsExist(childKey)){
//                    return new ResponseEntity<>(ErrorCode.DTO_DEPTH_OVER.getMessage(), ErrorCode.DTO_DEPTH_OVER.getHttpStatus());
//                }
//            }
//
//            //current dto has parent and child
//            if(hasChild && hasParent){
//                return new ResponseEntity<>(ErrorCode.DTO_DEPTH_OVER.getMessage(), ErrorCode.DTO_DEPTH_OVER.getHttpStatus());
//            }
//
//            dtoSpecEntityService.updateDtoEntity(dtoId, updateDtoSpecDto);
//
//        }
//        catch (CustomException customException){
//            return new ResponseEntity<>(customException.getMessage(), customException.getHttpStatus());
//        }
//
//        //dto depth 가 2를 벗어나는지 확인하는 로직 필요 - mysql
//        //3. update entity
//        //4. update document
//        return new ResponseEntity<>(updateDtoSpecDto, HttpStatus.OK);
//    }


}
