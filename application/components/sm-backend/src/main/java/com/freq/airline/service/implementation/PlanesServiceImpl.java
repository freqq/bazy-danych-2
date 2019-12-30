package com.freq.airline.service.implementation;

import com.freq.airline.model.Plane;
import com.freq.airline.payload.PlaneRequest;
import com.freq.airline.repository.PlanesRepository;
import com.freq.airline.service.PlanesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanesServiceImpl implements PlanesService {
    private PlanesRepository planesRepository;

    @Autowired
    public PlanesServiceImpl(PlanesRepository planesRepository){
        this.planesRepository = planesRepository;
    }

    public List<Plane> getPlanes() {
        return planesRepository.findAll();
    }

    public ResponseEntity<?> removePlane(Long planeId){
        Optional<Plane> plane = planesRepository.findById(planeId);
        if(plane.isPresent()){
            planesRepository.removeById(planeId);
            return new ResponseEntity<>("Plane removed", HttpStatus.OK);
        }

        return new ResponseEntity<>("Plane with given ID not found", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> addPlane(PlaneRequest planeRequest){
        Plane plane = new Plane();
        plane.setPlaneModel(planeRequest.getPlaneModel());
        plane.setSeatsCount(Integer.parseInt(planeRequest.getSeatsCount()));

        planesRepository.save(plane);

        return new ResponseEntity<>("Plane created", HttpStatus.OK);
    }
}
