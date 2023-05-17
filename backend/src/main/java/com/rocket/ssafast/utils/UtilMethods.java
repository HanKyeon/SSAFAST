package com.rocket.ssafast.utils;

import java.util.Collections;

public class UtilMethods {
    public static <T> Iterable<T> emptyIfNull(Iterable<T> iterable){
        return iterable == null ? Collections.EMPTY_LIST : iterable;
    }

}
