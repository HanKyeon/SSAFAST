package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.dtospec.repository.DtoSpecRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class DtoSpecService {

    private final DtoSpecRepository dtoSpecRepository;

}
