package com.freq.airline.repository;

import com.freq.airline.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdersRepository extends JpaRepository<Order, Long> {
    List<Order> findAll();
    Optional<Order> findById(Long orderId);
    void removeById(Long orderId);
}
