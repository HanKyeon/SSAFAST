package com.rocket.ssafast.dtospec.dto.response;


import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import com.rocket.ssafast.dtospec.dto.request.AddDtoSpecDto;

public class AddCompleteCheckDto {
    /*
    * never used
    * 나중에 dto update 확인할 때 쓸수도 있음
    * */

    private Long dtoId;
    private AddDtoSpecDto addDtoSpecDto;

    public AddCompleteCheckDto(Long dtoId, AddDtoSpecDto addDtoSpecDto, DtoInfo dto){
        this.dtoId = dtoId;
        this.addDtoSpecDto = addDtoSpecDto;
        this.addDtoSpecDto.setDocument(dto);
    }

}
