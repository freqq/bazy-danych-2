package com.freq.airline.service.implementation;

import com.freq.airline.model.Ticket;
import com.freq.airline.payload.*;
import com.freq.airline.repository.TicketsRepository;
import com.freq.airline.service.TicketsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TicketsServiceImpl implements TicketsService {
    private TicketsRepository ticketsRepository;

    @Autowired
    public TicketsServiceImpl(TicketsRepository ticketsRepository) {
        this.ticketsRepository = ticketsRepository;
    }

    public List<TicketListResponse> getTickets() {
        List<TicketListResponse> ticketListResponses = new ArrayList<>();
        List<Ticket> tickets = ticketsRepository.findAll();

        for(Ticket ticket : tickets){
            TicketListResponse ticketListResponse = new TicketListResponse();

            ticketListResponse.setId(ticket.getId());
            ticketListResponse.setPrice(ticket.getPrice());
            ticketListResponse.setSeatNumber(ticket.getSeatNumber());

            ticketListResponses.add(ticketListResponse);
        }

        return ticketListResponses;
    }

    public ResponseEntity<?> removeTicket(Long ticketId) {
        Optional<Ticket> ticket = ticketsRepository.findById(ticketId);

        if (ticket.isPresent()) {
            ticketsRepository.removeById(ticketId);
            return new ResponseEntity<>("Ticket removed", HttpStatus.OK);
        }

        return new ResponseEntity<>("Ticket with given ID not found", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> addTicket(TicketRequest ticketRequest) {
        Ticket ticket = new Ticket();

        ticket.setPrice(ticketRequest.getPrice());
        ticket.setSeatNumber(ticketRequest.getSeatNumber());

        ticketsRepository.save(ticket);

        return new ResponseEntity<>("Client created", HttpStatus.OK);
    }

    public TicketResponse getTicketById(Long ticketId) {
        Optional<Ticket> ticket = ticketsRepository.findById(ticketId);
        return ticket.isPresent() ? new TicketResponse(ticket.get()) : null;
    }

    public ResponseEntity<?> editTicket(Long ticketId, TicketEditRequest ticketEditRequest) {
        Optional<Ticket> ticket = ticketsRepository.findById(ticketId);

        if (ticket.isPresent()) {
            if (ticketEditRequest.getPrice() != 0)
                ticket.get().setPrice(ticketEditRequest.getPrice());
            if (ticketEditRequest.getSeatNumber() != null)
                ticket.get().setSeatNumber(ticketEditRequest.getSeatNumber());

            ticketsRepository.save(ticket.get());

            return new ResponseEntity<>("Ticket with given id edited correctly.", HttpStatus.OK);
        }

        return new ResponseEntity<>("Ticket with given id doesnt exists.", HttpStatus.NOT_FOUND);
    }
}
