package com.rocket.ssafast.tmp.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.rocket.ssafast.tmp.dto.TmpItemDto;

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
@Entity(name = "tmp_item")
public class TmpItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(name = "order_id")
	private long orderId;

	@Column
	private String name;

	@Column
	private double price;

	public TmpItemDto toDto() {
		return TmpItemDto.builder()
			.id(id)
			.orderId(orderId)
			.name(name)
			.price(price)
			.build();
	}
}
