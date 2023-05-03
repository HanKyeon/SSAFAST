package com.rocket.ssafast.apispec.service;

import com.rocket.ssafast.apispec.dto.response.BaseurlsDto;
import com.rocket.ssafast.exception.CustomException;
import com.rocket.ssafast.exception.ErrorCode;
import com.rocket.ssafast.workspace.domain.Baseurl;
import com.rocket.ssafast.workspace.dto.response.BaseurlDto;
import com.rocket.ssafast.workspace.repository.BaseurlRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiPreService {

    private final BaseurlRepository baseurlRepository;
    @Transactional
    public BaseurlsDto getBaseurls(Long workspaceId){
        //workspaceid로 baseurl가져오기
        List<Baseurl> baseurls = baseurlRepository.findAllByWorkspaceId(workspaceId);
        if(baseurls.size() == 0 ){
            throw new CustomException(ErrorCode.WORKSPACE_NOT_FOUND);
        }
        List<BaseurlDto> baseurlDtos = new ArrayList<>();
        for(Baseurl baseurl : baseurls){
            baseurlDtos.add(BaseurlDto.builder()
                    .id(baseurl.getId())
                    .url(baseurl.getUrl()).build()
            );
        }

        return BaseurlsDto.builder()
                .baseurls(baseurlDtos).build();
    }
}
