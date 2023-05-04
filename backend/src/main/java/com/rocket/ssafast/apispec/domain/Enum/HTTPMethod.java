package com.rocket.ssafast.apispec.domain.Enum;

import lombok.AllArgsConstructor;

import java.util.Collections;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@AllArgsConstructor
public enum HTTPMethod {

    GET(1, "GET"),
    POST(2, "POST"),
    PUT(3, "PUT"),
    DELETE(4, "DELETE"),
    PATCH(5, "PATCH");

    private int number;
    private String status;

    private static final Map<String, Integer> BY_STATUS =
            Stream.of(values()).collect(
                    Collectors.collectingAndThen(
                            Collectors.toMap(HTTPMethod::status, HTTPMethod::number), Collections::unmodifiableMap));

    private static final Map<Integer, String> BY_NUMBER =
            Stream.of(values()).collect(
                    Collectors.collectingAndThen(
                            Collectors.toMap(HTTPMethod::number, HTTPMethod::status), Collections::unmodifiableMap));


    public int number(){ return number; }
    public String status() { return status; }

    public static String getStatusByNumber(int number){ return BY_NUMBER.get(number).toString(); }
    public static int getNumberByStatus(String status) { return BY_STATUS.get(status); }
}
