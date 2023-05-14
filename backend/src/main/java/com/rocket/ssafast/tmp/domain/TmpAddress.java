package com.rocket.ssafast.tmp.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.rocket.ssafast.tmp.dto.TmpAddressDto;

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
@Entity(name = "tmp_address")
public class TmpAddress {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column
	private String street;

	@Column
	private String city;

	@Column
	private String state;

	public TmpAddressDto toDto() {
		return TmpAddressDto.builder()
			.id(id)
			.street(street)
			.state(state)
			.city(city)
			.build();
	}
}
