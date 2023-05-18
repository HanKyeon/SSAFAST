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
import javax.persistence.OneToOne;

import com.rocket.ssafast.tmp.dto.TmpOrderDto;
import com.rocket.ssafast.tmp.dto.TmpUserDto;

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
@Entity(name = "tmp_user")
public class TmpUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column
	private String name;

	@Column
	private int age;

	@ManyToOne(targetEntity = TmpAddress.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private TmpAddress address;


	public TmpUserDto toDto() {
		return TmpUserDto.builder()
			.id(id)
			.name(name)
			.age(age)
			.address(address.toDto())
			.build();
	}
}
