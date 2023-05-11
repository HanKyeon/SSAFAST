package com.rocket.ssafast.tmp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rocket.ssafast.tmp.domain.TmpItem;
import com.rocket.ssafast.tmp.domain.TmpOrder;
import com.rocket.ssafast.tmp.domain.TmpUser;
import com.rocket.ssafast.tmp.dto.TmpItemDto;
import com.rocket.ssafast.tmp.dto.TmpOrderDto;
import com.rocket.ssafast.tmp.dto.TmpUserDto;
import com.rocket.ssafast.tmp.repository.TmpItemRepository;
import com.rocket.ssafast.tmp.repository.TmpUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TmpService {

	private final TmpUserRepository tmpUserRepository;

	private final TmpItemRepository tmpItemRepository;


	public List<TmpOrderDto> save(TmpUserDto tmpUserDto) {
		TmpUser tmpUser = tmpUserDto.toEntity();
		List<TmpOrder> tmpOrders = new ArrayList<>();
		tmpUserDto.getOrderList().forEach(orderDto -> {
			TmpOrder order = orderDto.toEntity();
			order.setTmpUser(tmpUser);
			tmpOrders.add(order);
		});
		tmpUser.setOrders(tmpOrders);
		return tmpUserRepository.save(tmpUser).toDto().getOrderList();
	}

	public List<TmpItemDto> saveOrderItems(long orderId, List<TmpItemDto> tmpItemDtos) {
		List<TmpItemDto> tmpItemList = new ArrayList<>();
		tmpItemDtos.forEach(tmpItemDto -> {
			tmpItemDto.setOrderId(orderId);
			tmpItemList.add(tmpItemRepository.save(tmpItemDto.toEntity()).toDto());
		});
		return tmpItemList;
	}

	public TmpItemDto getOrderItems(long itemId) {
		return tmpItemRepository.findById(itemId).get().toDto();
	}
}
