package com.rocket.ssafast.apispec.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Entity;

@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "api_info")
public class ApiSpecEntity {

    private Long id;

    private String name;

    private String description;
// enum 만들자잇
    private int method;

    private int status;

}
