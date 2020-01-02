package com.freq.airline.controller;

import com.freq.airline.payload.*;
import com.freq.airline.service.TicketsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets")
public class TicketsController {
    private TicketsService ticketsService;

    @Autowired
    public TicketsController(TicketsService ticketsService){
        this.ticketsService = ticketsService;
    }

    @GetMapping("/")
    public List<TicketListResponse> getTickets() {
        return ticketsService.getTickets();
    }

    @GetMapping("/{id}")
    public TicketResponse getTicket(@PathVariable("id") Long ticketId){
        return ticketsService.getTicketById(ticketId);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> editTicket(@PathVariable("id") Long ticketId,
                                       @Valid @RequestBody TicketEditRequest ticketEditRequest){
        return ticketsService.editTicket(ticketId, ticketEditRequest);
    }

    @PostMapping("/remove/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removeTicket(@PathVariable("id") Long ticketId){
        return ticketsService.removeTicket(ticketId);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addTicket(@Valid @RequestBody TicketRequest ticketRequest){
        return ticketsService.addTicket(ticketRequest);
    }
}
