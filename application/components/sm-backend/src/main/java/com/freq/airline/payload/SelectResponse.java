package com.freq.airline.payload;

import lombok.Data;

@Data
public class SelectResponse {
    private Long id;
    private String value;

    public SelectResponse(Long id, String value) {
        this.id = id;
        this.value = value;
    }
}
