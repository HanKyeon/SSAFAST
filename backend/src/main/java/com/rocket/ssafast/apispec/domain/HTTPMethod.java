package com.rocket.ssafast.apispec.domain;

import lombok.AllArgsConstructor;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@AllArgsConstructor
public enum HTTPMethod {

    GET(1),
    POST(2),
    PUT(3),
    DELETE(4),
    PATCH(5);

    private int number;
    private static final Map<Integer, HTTPMethod> BY_NUMBER
            = Stream.of(values()).collect(Collectors.toMap(HTTPMethod::number, Function.identity()));

    public int number(){ return this.number; }

    public static String valueOfNumber(int number){ return BY_NUMBER.get(number).toString(); }
}
