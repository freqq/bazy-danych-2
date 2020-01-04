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
        parameterWithTypeList.add(new ParameterWithType(order.getClient().getFirstName() + " "
                + order.getClient().getLastName() + " (" + order.getClient().getPesel() + ")", "client"));
        parameterWithTypeList.add(new ParameterWithType(order.getFlight().getStartPlace()
                + " -> " + order.getFlight().getDestinationPlace(), "flight"));
        parameterWithTypeList.add(new ParameterWithType(order.getTicket().getSeatNumber() + " ("
                + order.getTicket().getPrice() + " $)", "ticket"));
        parameterWithTypeList.add(new ParameterWithType(order.getBaggageWeight(), "baggageWeight"));
        parameterWithTypeList.add(new ParameterWithType(order.getFlightClass(), "flightClass"));
    }
}
