package com.freq.airline.payload;

import com.freq.airline.model.Order;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class OrderResponse {
    List<ParameterWithType> parameterWithTypeList;

    public OrderResponse(Order order) {
        this.parameterWithTypeList = new ArrayList<>();

        parameterWithTypeList.add(new ParameterWithType(order.getId(), "id"));
        parameterWithTypeList.add(new ParameterWithType(order.getClient().getId(), "client"));
        parameterWithTypeList.add(new ParameterWithType(order.getFlight().getId(), "flight"));
        parameterWithTypeList.add(new ParameterWithType(order.getTicket().getId(), "ticket"));
        parameterWithTypeList.add(new ParameterWithType(order.getBaggageWeight(), "baggageWeight"));
        parameterWithTypeList.add(new ParameterWithType(order.getFlightClass(), "flightClass"));
    }
}
