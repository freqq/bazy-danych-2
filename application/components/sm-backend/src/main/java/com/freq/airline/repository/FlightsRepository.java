package com.freq.airline.repository;

import com.freq.airline.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlightsRepository extends JpaRepository<Flight, Long> {
    List<Flight> findAll();
    Optional<Flight> findById(Long flightId);
    Optional<Flight> findByPlanePlaneModel(String planeModel);
    void removeById(Long flightId);
}
