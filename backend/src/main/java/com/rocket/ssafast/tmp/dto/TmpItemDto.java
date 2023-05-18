package com.rocket.ssafast.tmp.dto;

import com.rocket.ssafast.tmp.domain.TmpItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TmpItemDto {
	private Long id;
	private Long orderId;
	private String name;
	private double price;

	public TmpItem toEntity() {
		return TmpItem.builder()
			.name(name)
			.price(price)
			.build();
	}
}
