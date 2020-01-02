package com.freq.airline.payload;

import com.freq.airline.model.Carrier;
import lombok.Data;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Data
public class CarrierResponse {
    List<ParameterWithType> parameterWithTypeList;

    public CarrierResponse(Object object) {
        this.parameterWithTypeList = new ArrayList<>();
        Field[] fields = Carrier.class.getDeclaredFields();
        try {
            for (Field field : fields)
                this.parameterWithTypeList.add(new ParameterWithType(field.get(object), field.getName()));
        } catch (Exception exception){
            System.out.println(exception);
        }
    }
}
