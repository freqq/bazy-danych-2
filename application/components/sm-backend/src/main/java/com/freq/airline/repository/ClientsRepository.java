package com.freq.airline.repository;

import com.freq.airline.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientsRepository extends JpaRepository<Client, Long> {
    List<Client> findAll();
    Optional<Client> findById(Long clientId);
    Optional<Client> findClientByFirstName(String firstName);
    void removeById(Long clientId);
}
