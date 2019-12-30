package com.freq.airline.service;

import com.freq.airline.model.Plane;
import com.freq.airline.payload.PlaneRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface PlanesService {
    List<Plane> getPlanes();
    ResponseEntity<?> removePlane(Long planeId);
    ResponseEntity<?> addPlane(PlaneRequest planeRequest);
}
