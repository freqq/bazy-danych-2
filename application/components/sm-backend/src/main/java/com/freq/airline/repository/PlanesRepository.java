package com.freq.airline.repository;

import com.freq.airline.model.Plane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanesRepository extends JpaRepository<Plane, Long> {
    List<Plane> findAll();
    Optional<Plane> findById(Long planeId);
    Optional<Plane> findByPlaneModel(String planeModel);
    void removeById(Long planeId);
}
