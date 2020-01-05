package com.freq.airline.utils;

import lombok.Data;

import java.util.List;

@Data
public class DataSet {
    private String label;
    private List<Integer> data;
    private List<String> backgroundColor;
}
