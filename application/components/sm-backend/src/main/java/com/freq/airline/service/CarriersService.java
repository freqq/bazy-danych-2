package com.freq.airline.service;

import com.freq.airline.payload.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface CarriersService {
    List<CarrierListResponse> getCarriers();
    CarrierResponse getCarrierById(Long carrierId);
    ResponseEntity<?> editCarrier(Long carrierId, CarrierEditRequest carrierEditRequest);
    ResponseEntity<?> removeCarrier(Long carrierId);
    ResponseEntity<?> addCarrier(CarrierRequest carrierRequest);
    List<SelectResponse> getCarrierNames();
}
