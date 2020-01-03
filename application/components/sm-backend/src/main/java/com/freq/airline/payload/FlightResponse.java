package com.freq.airline.payload;

import com.freq.airline.model.Flight;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class FlightResponse {
    List<ParameterWithType> parameterWithTypeList;

    public FlightResponse(Flight flight) {
        this.parameterWithTypeList = new ArrayList<>();

        parameterWithTypeList.add(new ParameterWithType(flight.getId(), "id"));
        parameterWithTypeList.add(new ParameterWithType(flight.getDestinationPlace(), "destinationPlace"));
        parameterWithTypeList.add(new ParameterWithType(flight.getStartPlace(), "startPlace"));
        parameterWithTypeList.add(new ParameterWithType(flight.getFlightDate(), "flightDate"));
        parameterWithTypeList.add(new ParameterWithType(flight.getCarrier().getCarrierName(), "carrierName"));
        parameterWithTypeList.add(new ParameterWithType(flight.getPlane().getPlaneModel(), "planeName"));
    }
}
