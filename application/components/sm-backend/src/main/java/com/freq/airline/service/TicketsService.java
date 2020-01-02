package com.freq.airline.service;

import com.freq.airline.payload.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface TicketsService {
    List<TicketListResponse> getTickets();
    TicketResponse getTicketById(Long ticketId);
    ResponseEntity<?> editTicket(Long ticketId, TicketEditRequest ticketEditRequest);
    ResponseEntity<?> removeTicket(Long ticketId);
    ResponseEntity<?> addTicket(TicketRequest ticketRequest);
}
