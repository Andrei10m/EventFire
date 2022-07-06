package com.example.eventfireback.util;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Util {

    public static List<Integer> getIds(String str){
        return Arrays.stream(str.split(",")).map(Integer::valueOf).collect(Collectors.toList());
    }

    public static String concatIds(List<Integer> ids){
        return ids.stream().map(String::valueOf).collect(Collectors.joining(","));
    }

}
