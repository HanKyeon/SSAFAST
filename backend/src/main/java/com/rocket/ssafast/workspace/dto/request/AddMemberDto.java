package com.rocket.ssafast.workspace.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AddMemberDto {
    private List<Long> memberIds;
}
