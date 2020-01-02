package com.freq.airline.service.implementation;

import com.freq.airline.model.Plane;
import com.freq.airline.payload.PlaneEditRequest;
import com.freq.airline.payload.PlaneRequest;
import com.freq.airline.payload.PlaneResponse;
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

    public PlaneResponse getPlaneById(Long planeId) {
        Optional<Plane> plane = planesRepository.findById(planeId);
        return plane.isPresent() ? new PlaneResponse(plane.get()) : null;
    }

    public ResponseEntity<?> editPlane(Long planeId, PlaneEditRequest planeEditRequest) {
        Optional<Plane> plane = planesRepository.findById(planeId);

        if(plane.isPresent()){
            if(planeEditRequest.getPlaneModel() != null)
                plane.get().setPlaneModel(planeEditRequest.getPlaneModel());
            if(planeEditRequest.getSeatsCount() != 0)
                plane.get().setSeatsCount(planeEditRequest.getSeatsCount());

            planesRepository.save(plane.get());

            return new ResponseEntity<>("Plane with given id edited correctly.", HttpStatus.OK);
        }

        return new ResponseEntity<>("Plane with given id doesnt exists.", HttpStatus.NOT_FOUND);
    }
}
