package com.rocket.ssafast.apispec.domain.Entity;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Entity(name = "figma_section_api")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Slf4j
public class FigmaSectionApi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "api_info_id")
    private ApiSpecEntity apiSpecEntity;

    @Column(name = "figma_section_id")
    private Long figmaSectionId;
}
