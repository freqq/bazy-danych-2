package com.freq.airline.service;

import com.freq.airline.model.Plane;
import com.freq.airline.payload.PlaneEditRequest;
import com.freq.airline.payload.PlaneRequest;
import com.freq.airline.payload.PlaneResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface PlanesService {
    List<Plane> getPlanes();
    PlaneResponse getPlaneById(Long planeId);
    ResponseEntity<?> editPlane(Long planeId, PlaneEditRequest planeEditRequest);
    ResponseEntity<?> removePlane(Long planeId);
    ResponseEntity<?> addPlane(PlaneRequest planeRequest);
}
