package com.freq.airline.payload;

import lombok.Data;

@Data
public class ParameterWithType {
    private String fieldName;
    private Object value;
    private String type;

    public ParameterWithType(Object value, String fieldName) {
        this.fieldName = fieldName;
        this.value = value;
        this.type = value.getClass().getSimpleName().toLowerCase();
    }
}
