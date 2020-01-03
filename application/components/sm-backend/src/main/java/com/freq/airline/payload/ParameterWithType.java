package com.freq.airline.payload;

import lombok.Data;

@Data
class ParameterWithType {
    private String fieldName;
    private Object value;
    private String type;

    ParameterWithType(Object value, String fieldName) {
        this.fieldName = fieldName;
        this.value = value;
        this.type = value.getClass().getSimpleName().toLowerCase();
    }
}
