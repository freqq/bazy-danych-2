package com.freq.airline.repository;

import com.freq.airline.model.Plane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanesRepository extends JpaRepository<Plane, Long> {
    List<Plane> findAll();
    Optional<Plane> findById(Long planeId);
    void removeById(Long planeId);

    @Query(value="SELECT COUNT(p.id) FROM Planes p INNER JOIN Flights f ON p.id = f.plane_id WHERE p.id = :planeId", nativeQuery = true)
    int getPlaneFlightsCount(@Param("planeId") Long planeId);
}
