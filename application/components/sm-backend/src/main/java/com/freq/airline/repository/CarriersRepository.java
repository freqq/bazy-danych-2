package com.freq.airline.repository;

import com.freq.airline.model.Carrier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarriersRepository extends JpaRepository<Carrier, Long> {
    List<Carrier> findAll();
    Optional<Carrier> findById(Long carrierId);
    Optional<Carrier> findByCarrierName(String carrierName);
    void removeById(Long ticketId);
}
