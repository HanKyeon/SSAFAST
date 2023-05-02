package com.rocket.ssafast.dtospec.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@Document("test")
public class DtoSpecDocument {

    @Id
    private Long test;
}
