package com.rocket.ssafast.auth.service;


import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate<String, String> redisTemplate;

	// 만료시간 설정 -> 자동 삭제
	@Transactional
	public void setValuesWithTimeout(String key, String value, long timeout){
		redisTemplate.opsForValue().set(key, value, timeout, TimeUnit.MILLISECONDS);
	}

	public String getValues(String key){
		return redisTemplate.opsForValue().get(key);
	}

	@Transactional
	public void deleteValues(String key) {
		redisTemplate.delete(key);
	}

	public Map<String, Object> getAllKeysAndValues() {
		Set<String> keys = redisTemplate.keys("*");
		Map<String, Object> allData = new HashMap<>();

		if (keys != null) {
			for (String key : keys) {
				Object value = redisTemplate.opsForValue().get(key);
				allData.put(key, value);
			}
		}

		return allData;
	}
}
