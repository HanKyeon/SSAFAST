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
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity(name = "tmp_item")
public class TmpItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id")
	private TmpOrder order;

	@Column
	private String name;

	@Column
	private double price;

	public TmpItemDto toDto() {
		return TmpItemDto.builder()
			.id(id)
			.name(name)
			.orderId(order.id)
			.price(price)
			.build();
	}
}
