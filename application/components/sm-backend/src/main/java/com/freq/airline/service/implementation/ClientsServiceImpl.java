package com.freq.airline.service.implementation;

import com.freq.airline.model.Client;
import com.freq.airline.model.Flight;
import com.freq.airline.payload.*;
import com.freq.airline.repository.ClientsRepository;
import com.freq.airline.service.ClientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientsServiceImpl implements ClientsService {
    private ClientsRepository clientsRepository;

    @Autowired
    public ClientsServiceImpl(ClientsRepository clientsRepository) {
        this.clientsRepository = clientsRepository;
    }

    public List<ClientListResponse> getClients() {
        List<ClientListResponse> clientListResponses = new ArrayList<>();
        List<Client> clientList = clientsRepository.findAll();

        for(Client client : clientList){
            ClientListResponse clientListResponse = new ClientListResponse();

            clientListResponse.setId(client.getId());
            clientListResponse.setFirstName(client.getFirstName());
            clientListResponse.setLastName(client.getLastName());
            clientListResponse.setBirthday(client.getBirthday());
            clientListResponse.setEmail(client.getEmail());
            clientListResponse.setDiscount(client.isDiscount());
            clientListResponse.setIDNumber(client.getIDNumber());
            clientListResponse.setPesel(client.getPesel());


            clientListResponses.add(clientListResponse);
        }

        return clientListResponses;
    }

    public ResponseEntity<?> removeClient(Long clientId) {
        Optional<Client> plane = clientsRepository.findById(clientId);
        if (plane.isPresent()) {
            clientsRepository.removeById(clientId);
            return new ResponseEntity<>("Client removed", HttpStatus.OK);
        }

        return new ResponseEntity<>("Client with given ID not found", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> addClient(ClientRequest clientRequest) {
        Client client = new Client();

        client.setFirstName(clientRequest.getFirstName());
        client.setLastName(clientRequest.getLastName());
        client.setEmail(clientRequest.getEmail());
        client.setPesel(clientRequest.getPesel());
        client.setDiscount(clientRequest.isDiscount());
        client.setBirthday(clientRequest.getBirthday());
        client.setIDNumber(clientRequest.getIDNumber());

        clientsRepository.save(client);

        return new ResponseEntity<>("Client created", HttpStatus.OK);
    }

    public ClientResponse getClientById(Long clientId) {
        Optional<Client> client = clientsRepository.findById(clientId);
        return client.isPresent() ? new ClientResponse(client.get()) : null;
    }

    public ResponseEntity<?> editClient(Long planeId, ClientEditRequest planeEditRequest) {
        Optional<Client> client = clientsRepository.findById(planeId);

        if (client.isPresent()) {
            if (planeEditRequest.getFirstName() != null)
                client.get().setFirstName(planeEditRequest.getFirstName());
            if (planeEditRequest.getLastName() != null)
                client.get().setLastName(planeEditRequest.getLastName());
            if (planeEditRequest.getPesel() != null)
                client.get().setPesel(planeEditRequest.getPesel());
            if (planeEditRequest.getBirthday() != null)
                client.get().setBirthday(planeEditRequest.getBirthday());
            if (planeEditRequest.getEmail() != null)
                client.get().setEmail(planeEditRequest.getEmail());
            if (planeEditRequest.getIdnumber() != null)
                client.get().setIDNumber(planeEditRequest.getIdnumber());

            client.get().setDiscount(planeEditRequest.isDiscount());


            clientsRepository.save(client.get());

            return new ResponseEntity<>("Client with given id edited correctly.", HttpStatus.OK);
        }

        return new ResponseEntity<>("Client with given id doesnt exists.", HttpStatus.NOT_FOUND);
    }

    public List<SelectResponse> getClientsNames() {
        List<Client> clients = clientsRepository.findAll();
        List<SelectResponse> clientsNames = new ArrayList<>();

        for(Client client : clients)
            clientsNames.add(new SelectResponse(client.getId(),
                    client.getFirstName() + " " + client.getLastName() + " (" + client.getPesel() + ")"));

        return clientsNames;
    }
}