package com.rocket.ssafast.tmp.dto;

import com.rocket.ssafast.tmp.domain.TmpOrder;
import com.rocket.ssafast.tmp.domain.TmpUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TmpOrderDto {
	private Long id;
	private Long userId;
	private String num;

	// getters and setters
	public TmpOrder toEntity() {
		return TmpOrder.builder()
			.num(num)
			.build();
	}
}
