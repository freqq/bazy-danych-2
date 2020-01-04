package com.freq.airline.service;

import com.freq.airline.payload.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface OrdersService {
    List<OrderListResponse> getOrders();
    OrderResponse getOrderById(Long orderId);
    ResponseEntity<?> editOrder(Long orderId, OrderEditRequest orderEditRequest);
    ResponseEntity<?> removeOrder(Long orderId);
    ResponseEntity<?> addOrder(OrderRequest orderRequest);
}
