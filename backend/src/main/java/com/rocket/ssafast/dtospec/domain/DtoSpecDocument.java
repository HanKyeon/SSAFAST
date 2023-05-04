package com.rocket.ssafast.dtospec.domain;

import com.rocket.ssafast.dtospec.domain.element.DtoInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Map;

@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("SSAFAST_DTO")
public class DtoSpecDocument {

    @Id
    private String id;

    private Map<Long, DtoInfo> dtos;

    public DtoSpecDocument toDto(){
        return DtoSpecDocument.builder().id(id).build();
    }
}
