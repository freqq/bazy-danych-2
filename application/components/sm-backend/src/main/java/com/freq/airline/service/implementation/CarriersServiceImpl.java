package com.freq.airline.service.implementation;

import com.freq.airline.model.Carrier;
import com.freq.airline.payload.*;
import com.freq.airline.repository.CarriersRepository;
import com.freq.airline.service.CarriersService;
import org.hibernate.sql.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CarriersServiceImpl implements CarriersService {
    private CarriersRepository carriersRepository;

    @Autowired
    public CarriersServiceImpl(CarriersRepository carriersRepository) {
        this.carriersRepository = carriersRepository;
    }

    public List<CarrierListResponse> getCarriers() {
        List<CarrierListResponse> carrierListResponses = new ArrayList<>();
        List<Carrier> carriers = carriersRepository.findAll();

        for(Carrier carrier : carriers){
            CarrierListResponse carrierListResponse = new CarrierListResponse();

            carrierListResponse.setId(carrier.getId());
            carrierListResponse.setCarrierName(carrier.getCarrierName());

            carrierListResponses.add(carrierListResponse);
        }

        return carrierListResponses;
    }

    public ResponseEntity<?> removeCarrier(Long carrierId) {
        Optional<Carrier> carrier = carriersRepository.findById(carrierId);

        if (carrier.isPresent()) {
            carriersRepository.removeById(carrierId);
            return new ResponseEntity<>("Carrier removed", HttpStatus.OK);
        }

        return new ResponseEntity<>("Carrier with given ID not found", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> addCarrier(CarrierRequest carrierRequest) {
        Carrier carrier = new Carrier();

        carrier.setCarrierName(carrierRequest.getCarrierName());

        carriersRepository.save(carrier);

        return new ResponseEntity<>("Carrier created", HttpStatus.CREATED);
    }

    public CarrierResponse getCarrierById(Long carrierId) {
        Optional<Carrier> carrier = carriersRepository.findById(carrierId);
        return carrier.isPresent() ? new CarrierResponse(carrier.get()) : null;
    }

    public ResponseEntity<?> editCarrier(Long carrierId, CarrierEditRequest ticketEditRequest) {
        Optional<Carrier> carrier = carriersRepository.findById(carrierId);

        if (carrier.isPresent()) {
            if (ticketEditRequest.getCarrierName() != null)
                carrier.get().setCarrierName(ticketEditRequest.getCarrierName());

            carriersRepository.save(carrier.get());

            return new ResponseEntity<>("Carrier with given id edited correctly.", HttpStatus.OK);
        }

        return new ResponseEntity<>("Carrier with given id doesnt exists.", HttpStatus.NOT_FOUND);
    }

    public List<SelectResponse> getCarrierNames(){
        List<Carrier> carriers = carriersRepository.findAll();
        List<SelectResponse> carrierNames = new ArrayList<>();

        for(Carrier carrier : carriers)
            carrierNames.add(new SelectResponse(carrier.getId(), carrier.getCarrierName()));

        return carrierNames;
    }
}
