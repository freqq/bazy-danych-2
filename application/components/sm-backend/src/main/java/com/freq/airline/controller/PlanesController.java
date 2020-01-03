package com.freq.airline.controller;

import com.freq.airline.model.Plane;
import com.freq.airline.payload.PlaneEditRequest;
import com.freq.airline.payload.PlaneRequest;
import com.freq.airline.payload.PlaneResponse;
import com.freq.airline.service.PlanesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @GetMapping("/{id}")
    public PlaneResponse getPlane(@PathVariable("id") Long planeId){
        return planesService.getPlaneById(planeId);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> editPlane(@PathVariable("id") Long planeId, @Valid @RequestBody PlaneEditRequest planeEditRequest){
        return planesService.editPlane(planeId, planeEditRequest);
    }

    @GetMapping("/names")
    public List<String> getPlanesNames(){
        return planesService.getPlanesNames();
    }

    @PostMapping("/remove/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removePlane(@PathVariable("id") Long planeId){
        return planesService.removePlane(planeId);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addPlane(@Valid @RequestBody PlaneRequest planeRequest){
        return planesService.addPlane(planeRequest);
    }
}
