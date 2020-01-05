package com.freq.airline.utils;

import lombok.Data;

@Data
public class PlaneCount {
    private Long planeId;
    private int planeCount;

    public PlaneCount(Long planeId, int planeCount) {
        this.planeId = planeId;
        this.planeCount = planeCount;
    }
}
