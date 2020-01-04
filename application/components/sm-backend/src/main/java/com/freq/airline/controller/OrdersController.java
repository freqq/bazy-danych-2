package com.freq.airline.controller;

import com.freq.airline.payload.*;
import com.freq.airline.service.OrdersService;
import com.freq.airline.service.TicketsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrdersController {
    private OrdersService ordersService;

    @Autowired
    public OrdersController(OrdersService ordersService){
        this.ordersService = ordersService;
    }

    @GetMapping("/")
    public List<OrderListResponse> getOrders() {
        return ordersService.getOrders();
    }

    @GetMapping("/{id}")
    public OrderResponse getOrder(@PathVariable("id") Long orderId){
        return ordersService.getOrderById(orderId);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> editOrder(@PathVariable("id") Long orderId,
                                        @Valid @RequestBody OrderEditRequest orderEditRequest){
        return ordersService.editOrder(orderId, orderEditRequest);
    }

    @PostMapping("/remove/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removeOrder(@PathVariable("id") Long orderId){
        return ordersService.removeOrder(orderId);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addOrder(@Valid @RequestBody OrderRequest orderRequest){
        return ordersService.addOrder(orderRequest);
    }
}
