package com.freq.airline.repository;

import com.freq.airline.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketsRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findAll();
    Optional<Ticket> findById(Long ticketId);
    Optional<Ticket> findBySeatNumber(String seatNumber);
    void removeById(Long ticketId);
}
