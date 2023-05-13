package com.rocket.ssafast.usecase.domain.entity;

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
import javax.persistence.OneToMany;

import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate
@Entity(name = "usecase_test")
public class UsecaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	@Column(name = "name")
	String name;

	@Column(name = "description")
	String description;

	@Column(name = "workspace_id")
	Long workspaceId;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	@JoinColumn(name = "usecase_test_id")
	List<UsecaseDtoEntity> usecaseTestDtoEntities = new ArrayList<>();

	public void setUsecaseTestDtoEntities(List<UsecaseDtoEntity> usecaseTestDtoEntities) {
		this.usecaseTestDtoEntities = usecaseTestDtoEntities;
	}
}
