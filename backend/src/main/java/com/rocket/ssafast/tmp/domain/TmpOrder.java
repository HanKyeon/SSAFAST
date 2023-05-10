package com.rocket.ssafast.tmp.domain;

import java.util.ArrayList;
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

import com.rocket.ssafast.tmp.dto.TmpItemDto;
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

	@ManyToOne(fetch = FetchType.LAZY)
	private TmpUser tmpUser;

	@Column(name = "num")
	String num;

	@OneToMany(targetEntity = TmpOrder.class, cascade = CascadeType.ALL)
	private List<TmpItem> items;


	public TmpOrderDto toDto() {
		return TmpOrderDto.builder()
			.id(id)
			.userId(tmpUser.id)
			.num(num)
			.build();
	}
}
