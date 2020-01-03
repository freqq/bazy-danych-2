package com.freq.airline.controller;

import com.freq.airline.payload.*;
import com.freq.airline.service.CarriersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/carriers")
public class CarriersController {
    private CarriersService carriersService;

    @Autowired
    public CarriersController(CarriersService carriersService){
        this.carriersService = carriersService;
    }

    @GetMapping("/")
    public List<CarrierListResponse> getCarriers() {
        return carriersService.getCarriers();
    }

    @GetMapping("/{id}")
    public CarrierResponse getCarrier(@PathVariable("id") Long carrierId){
        return carriersService.getCarrierById(carrierId);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> editCarrier(@PathVariable("id") Long carrierId,
                                        @Valid @RequestBody CarrierEditRequest carrierEditRequest){
        return carriersService.editCarrier(carrierId, carrierEditRequest);
    }

    @GetMapping("/names")
    public List<String> getCarrierNames(){
        return carriersService.getCarrierNames();
    }

    @PostMapping("/remove/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removeCarrier(@PathVariable("id") Long carrierId){
        return carriersService.removeCarrier(carrierId);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addCarrier(@Valid @RequestBody CarrierRequest carrierRequest){
        return carriersService.addCarrier(carrierRequest);
    }
}
