package com.freq.airline.controller;

import com.freq.airline.payload.*;
import com.freq.airline.service.ClientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
public class ClientsController {
    private ClientsService clientsService;

    @Autowired
    public ClientsController(ClientsService clientsService) {
        this.clientsService = clientsService;
    }

    @GetMapping("/")
    public List<ClientListResponse> getClients() {
        return clientsService.getClients();
    }

    @GetMapping("/{id}")
    public ClientResponse getClient(@PathVariable("id") Long clientId) {
        return clientsService.getClientById(clientId);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> editClient(@PathVariable("id") Long clientId,
            @Valid @RequestBody ClientEditRequest clientEditRequest) {
        return clientsService.editClient(clientId, clientEditRequest);
    }

    @PostMapping("/remove/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removeClient(@PathVariable("id") Long clientId) {
        return clientsService.removeClient(clientId);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addClient(@Valid @RequestBody ClientRequest clientRequest) {
        return clientsService.addClient(clientRequest);
    }
}
