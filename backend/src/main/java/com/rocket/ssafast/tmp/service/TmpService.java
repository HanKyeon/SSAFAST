package com.rocket.ssafast.tmp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rocket.ssafast.tmp.domain.TmpItem;
import com.rocket.ssafast.tmp.domain.TmpOrder;
import com.rocket.ssafast.tmp.dto.TmpItemDto;
import com.rocket.ssafast.tmp.dto.TmpOrderDto;
import com.rocket.ssafast.tmp.dto.TmpUserDto;
import com.rocket.ssafast.tmp.repository.TmpItemRepository;
import com.rocket.ssafast.tmp.repository.TmpOrderRepository;
import com.rocket.ssafast.tmp.repository.TmpUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TmpService {

	private final TmpUserRepository tmpUserRepository;

	private final TmpOrderRepository tmpOrderRepository;

	private final TmpItemRepository tmpItemRepository;

	public TmpUserDto saveUser(TmpUserDto tmpUserDto) {
		return tmpUserRepository.save(tmpUserDto.toEntity()).toDto();
	}

	public TmpOrderDto saveOrder(TmpOrderDto tmpOrderDto) {
		TmpOrder tmpOrder = tmpOrderDto.toEntity();

		TmpItem tmpItem = tmpOrderDto.getItem().toEntity();
		tmpItem.setOrder(tmpOrder);

		List<TmpItem> items = new ArrayList<>();
		items.add(tmpItem);

		tmpOrder.setItems(items);

		return tmpOrderRepository.save(tmpOrder).toDto();
	}

	public TmpItemDto getOrderItem(long itemId) {
		return tmpItemRepository.findById(itemId).get().toDto();
	}
}
