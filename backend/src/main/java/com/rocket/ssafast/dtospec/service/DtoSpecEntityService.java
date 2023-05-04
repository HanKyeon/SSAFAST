package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.dtospec.repository.DtoSpecEntityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DtoSpecEntityService {

    private DtoSpecEntityRepository dtoSpecEntityRepository;


}
