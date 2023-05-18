package com.rocket.ssafast.tmp.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rocket.ssafast.tmp.dto.TmpItemDto;
import com.rocket.ssafast.tmp.dto.TmpOrderDto;
import com.rocket.ssafast.tmp.dto.TmpUserDto;
import com.rocket.ssafast.tmp.service.TmpService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tmp")
@RequiredArgsConstructor
public class TmpController {

	private final TmpService tmpService;

	@PostMapping("/user/{userName}")
	ResponseEntity<?> postUserMethod(@RequestHeader(value = "Authorization") String auth, @RequestBody TmpUserDto tmpUserDto, @RequestParam List<String> pTest, @PathVariable("userName") String userName) {
		System.out.println("/api/tmp/user/사람이름의 쿼리 파람 잘 받았음: "+ pTest.get(0));

		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Authorization", auth);

		Map<String, TmpUserDto> result = new HashMap<>();
		result.put("user", tmpService.saveUser(tmpUserDto));
		return ResponseEntity.ok().headers(responseHeaders).body(result);
	}

	@PostMapping("/order")
	ResponseEntity<?> postOrderMethod(@RequestBody TmpOrderDto tmpOrderDto, @RequestParam String[] userAddressStreet) {
		System.out.println("/api/tmp/order: "+ Arrays.toString(userAddressStreet));
		Map<String, TmpOrderDto> result = new HashMap<>();
		result.put("order", tmpService.saveOrder(tmpOrderDto));
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/order-item/{itemId}")
	ResponseEntity<?> getItemsMethod(@PathVariable("itemId") Long itemId) {
		System.out.println("/api/tmp/order-item/itemid: "+ itemId);
		Map<String, TmpItemDto> result = new HashMap<>();
		result.put("orderItem", tmpService.getOrderItem(itemId));
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
