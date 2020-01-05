package com.freq.airline.payload;

import com.freq.airline.utils.DataSet;
import lombok.Data;

import java.util.List;

@Data
public class ChartData {
    private List<String> labels;
    private List<DataSet> datasets;
}
