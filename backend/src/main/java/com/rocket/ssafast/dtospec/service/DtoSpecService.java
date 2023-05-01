package com.rocket.ssafast.dtospec.service;

import com.rocket.ssafast.dtospec.repository.DtoSpecRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DtoSpecService {

    @Autowired
    DtoSpecRepository dtoSpecRepository;
}
