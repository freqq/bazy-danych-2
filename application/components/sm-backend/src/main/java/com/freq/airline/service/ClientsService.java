package com.freq.airline.service;

import com.freq.airline.payload.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface ClientsService {
    List<ClientListResponse> getClients();
    ClientResponse getClientById(Long clientId);
    ResponseEntity<?> editClient(Long clientId, ClientEditRequest planeEditRequest);
    ResponseEntity<?> removeClient(Long clientId);
    ResponseEntity<?> addClient(ClientRequest clientRequest);
    List<SelectResponse> getClientsNames();
}
