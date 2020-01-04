package com.freq.airline.service.implementation;

import com.freq.airline.model.Carrier;
import com.freq.airline.model.Flight;
import com.freq.airline.model.Plane;
import com.freq.airline.model.Ticket;
import com.freq.airline.payload.*;
import com.freq.airline.repository.CarriersRepository;
import com.freq.airline.repository.FlightsRepository;
import com.freq.airline.repository.PlanesRepository;
import com.freq.airline.service.FlightsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FlightsServiceImpl implements FlightsService {
    private FlightsRepository flightsRepository;
    private PlanesRepository planesRepository;
    private CarriersRepository carriersRepository;

    @Autowired
    public FlightsServiceImpl(FlightsRepository flightsRepository, PlanesRepository planesRepository,
                              CarriersRepository carriersRepository){
        this.flightsRepository = flightsRepository;
        this.planesRepository = planesRepository;
        this.carriersRepository = carriersRepository;
    }

    public List<FlightsListResponse> getFlights(){
        List<FlightsListResponse> flightsListResponses = new ArrayList<>();
        List<Flight> flights = flightsRepository.findAll();

        for(Flight flight : flights){
            FlightsListResponse flightsListResponse = new FlightsListResponse();

            flightsListResponse.setId(flight.getId());
            flightsListResponse.setStartPlace(flight.getStartPlace());
            flightsListResponse.setDestinationPlace(flight.getDestinationPlace());
            flightsListResponse.setFlightDate(flight.getFlightDate());
            flightsListResponse.setCarrierName(flight.getCarrier().getCarrierName());
            flightsListResponse.setPlaneName(flight.getPlane().getPlaneModel());

            flightsListResponses.add(flightsListResponse);
        }

        return flightsListResponses;
    }

    public ResponseEntity<?> removeFlight(Long flightId){
        Optional<Flight> flight = flightsRepository.findById(flightId);

        if (flight.isPresent()) {
            flightsRepository.removeById(flightId);
            return new ResponseEntity<>("Flight removed", HttpStatus.OK);
        }

        return new ResponseEntity<>("Flight with given ID not found", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> addFlight(FlightRequest flightRequest) {
        Flight flight = new Flight();

        Optional<Plane> plane = planesRepository.findById(flightRequest.getPlaneName());
        if(!plane.isPresent())
            return new ResponseEntity<>("Given plane doesnt exist", HttpStatus.BAD_REQUEST);

        Optional<Carrier> carrier = carriersRepository.findById(flightRequest.getCarrierName());
        if(!carrier.isPresent())
            return new ResponseEntity<>("Given carrier doesnt exist", HttpStatus.BAD_REQUEST);

        flight.setStartPlace(flightRequest.getStartPlace());
        flight.setDestinationPlace(flightRequest.getDestinationPlace());
        flight.setFlightDate(flightRequest.getFlightDate());
        flight.setCarrier(carrier.get());
        flight.setPlane(plane.get());

        flightsRepository.save(flight);

        return new ResponseEntity<>("Flight created", HttpStatus.CREATED);
    }

    public FlightResponse getFlightById(Long flightId) {
        Optional<Flight> flight = flightsRepository.findById(flightId);
        return flight.isPresent() ? new FlightResponse(flight.get()) : null;
    }

    public ResponseEntity<?> editFlight(Long flightId, FlightEditRequest flightEditRequest) {
        Optional<Flight> flight = flightsRepository.findById(flightId);
        Optional<Plane> plane = null;
        Optional<Carrier> carrier = null;
        if(flightEditRequest.getPlaneName() != null){
            plane = planesRepository.findById(flightEditRequest.getPlaneName());
            if(!plane.isPresent())
                return new ResponseEntity<>("Given plane doesnt exist", HttpStatus.BAD_REQUEST);
        }

        if(flightEditRequest.getCarrierName() != null){
            carrier = carriersRepository.findById(flightEditRequest.getCarrierName());
            if(!carrier.isPresent())
                return new ResponseEntity<>("Given carrier doesnt exist", HttpStatus.BAD_REQUEST);
        }

        if (flight.isPresent()) {
            if (flightEditRequest.getDestinationPlace() != null)
                flight.get().setDestinationPlace(flightEditRequest.getDestinationPlace());
            if (flightEditRequest.getStartPlace() != null)
                flight.get().setStartPlace(flightEditRequest.getStartPlace());
            if (flightEditRequest.getFlightDate() != null)
                flight.get().setFlightDate(flightEditRequest.getFlightDate());
            if(flightEditRequest.getCarrierName() != null)
                flight.get().setCarrier(carrier.get());
            if(flightEditRequest.getPlaneName() != null)
                flight.get().setPlane(plane.get());

            flightsRepository.save(flight.get());

            return new ResponseEntity<>("Flight with given id edited correctly.", HttpStatus.OK);
        }

        return new ResponseEntity<>("Flight with given id doesnt exists.", HttpStatus.NOT_FOUND);
    }

    public List<SelectResponse> getFlightsNames() {
        List<Flight> flights = flightsRepository.findAll();
        List<SelectResponse> flightsNames = new ArrayList<>();

        for(Flight flight : flights)
            flightsNames.add(new SelectResponse(flight.getId(),
                    flight.getStartPlace() + " -> " + flight.getDestinationPlace()
                            + " (" + flight.getFlightDate().toString().split(" ")[0] + ")"));

        return flightsNames;
    }
}
