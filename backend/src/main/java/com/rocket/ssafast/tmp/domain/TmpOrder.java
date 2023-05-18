package com.rocket.ssafast.tmp.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.rocket.ssafast.tmp.dto.TmpOrderDto;

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
@Entity(name = "tmp_order")
public class TmpOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(name = "member_id")
	Long userId;

	@Column(name = "num")
	String num;

	@OneToMany(targetEntity = TmpItem.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "order_id")
	private List<TmpItem> items;

	public TmpOrderDto toDto() {
		return TmpOrderDto.builder()
			.id(id)
			.userId(userId)
			.num(num)
			.item(items.get(items.size() - 1).toDto())
			.build();
	}
}
