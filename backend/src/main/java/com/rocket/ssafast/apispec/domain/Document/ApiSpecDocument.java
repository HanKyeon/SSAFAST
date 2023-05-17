package com.rocket.ssafast.apispec.domain.Document;

import com.rocket.ssafast.apispec.domain.Document.element.ApiDoc;
import com.rocket.ssafast.apispec.domain.Document.element.RequestDoc;
import com.rocket.ssafast.apispec.domain.Document.element.ResponseDoc;
import com.rocket.ssafast.apispec.domain.Document.temp.ApiSpecDoc;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Map;

@Slf4j
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document("SSAFAST_API_SPEC")
public class ApiSpecDocument {

    @Id
    private String id;
    private Map<Long, ApiSpecDoc> apis;

}
