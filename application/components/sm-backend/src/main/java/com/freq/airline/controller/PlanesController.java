package com.freq.airline.controller;

import com.freq.airline.model.Plane;
import com.freq.airline.service.PlanesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/planes")
public class PlanesController {
    private PlanesService planesService;

    @Autowired
    public PlanesController(PlanesService planesService){
        this.planesService = planesService;
    }

    @GetMapping("/")
    public List<Plane> getPlanes() {
        return planesService.getPlanes();
    }

    @PostMapping("/remove/{id}")
    public ResponseEntity<?> removePlane(@PathVariable("id") Long planeId){
        return planesService.removePlane(planeId);
    }
}
