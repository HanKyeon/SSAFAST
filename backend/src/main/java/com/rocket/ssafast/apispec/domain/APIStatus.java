package com.rocket.ssafast.apispec.domain;

import lombok.AllArgsConstructor;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@AllArgsConstructor
public enum APIStatus {
    IN_SPECIFICATION(1, "명세중"),
    COMP_SPECIFICATION(2, "명세완료"),

    IN_DEVELOP(3, "개발중"),

    COMP_DEVELOP(4, "개발완료");

    private int number;
    private String status;

    private static final Map<String, Integer> BY_STATUS =
            Stream.of(values()).collect(
                    Collectors.collectingAndThen(
                            Collectors.toMap(APIStatus::status, APIStatus::number), Collections::unmodifiableMap));

    private static final Map<Integer, String> BY_NUMBER =
            Stream.of(values()).collect(
                    Collectors.collectingAndThen(
                            Collectors.toMap(APIStatus::number, APIStatus::status), Collections::unmodifiableMap));

    public int number() { return number; }
    public String status() { return status; }

    public static String numberOfStatus(int number) { return BY_NUMBER.get(number); }
    public static int statusOfNumber(String status) { return BY_STATUS.get(status); }

}
