package com.freq.airline.service.implementation;

import com.freq.airline.model.*;
import com.freq.airline.payload.*;
import com.freq.airline.repository.*;
import com.freq.airline.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrdersService {
    private OrdersRepository ordersRepository;
    private ClientsRepository clientsRepository;
    private FlightsRepository flightsRepository;
    private TicketsRepository ticketsRepository;

    @Autowired
    public OrderServiceImpl(OrdersRepository ordersRepository, ClientsRepository clientsRepository,
                            FlightsRepository flightsRepository, TicketsRepository ticketsRepository) {
        this.ordersRepository = ordersRepository;
        this.clientsRepository = clientsRepository;
        this.flightsRepository = flightsRepository;
        this.ticketsRepository = ticketsRepository;
    }

    public List<OrderListResponse> getOrders() {
        List<OrderListResponse> orderListResponses = new ArrayList<>();
        List<Order> orders = ordersRepository.findAll();

        for(Order order : orders){
            OrderListResponse orderListResponse = new OrderListResponse();

            orderListResponse.setId(order.getId());
            orderListResponse.setClient(order.getClient().getFirstName()
                    + " " + order.getClient().getLastName() + " (" + order.getClient().getPesel() + ")");
            orderListResponse.setFlight(order.getFlight().getStartPlace() + " -> " + order.getFlight().getDestinationPlace());
            orderListResponse.setTicket(order.getTicket().getSeatNumber() + " (" + order.getTicket().getPrice() + " $)");
            orderListResponse.setBaggageWeight(order.getBaggageWeight());
            orderListResponse.setFlightClass(order.getFlightClass());

            orderListResponses.add(orderListResponse);
        }

        return orderListResponses;
    }

    public ResponseEntity<?> removeOrder(Long orderId) {
        Optional<Order> order = ordersRepository.findById(orderId);

        if (order.isPresent()) {
            ordersRepository.removeById(orderId);
            return new ResponseEntity<>("Order removed", HttpStatus.OK);
        }

        return new ResponseEntity<>("Order with given ID not found", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> addOrder(OrderRequest orderRequest) {
        Order order = new Order();
        Optional<Client> client = clientsRepository.findById(orderRequest.getClient());
        Optional<Flight> flight = flightsRepository.findById(orderRequest.getFlight());
        Optional<Ticket> ticket = ticketsRepository.findById(orderRequest.getTicket());

        if(!client.isPresent() || !flight.isPresent() || !ticket.isPresent())
            return new ResponseEntity<>("Given order data is wrong!", HttpStatus.BAD_REQUEST);

        order.setBaggageWeight(orderRequest.getBaggageWeight());
        order.setClient(client.get());
        order.setFlight(flight.get());
        order.setFlightClass(orderRequest.getFlightClass());
        order.setTicket(ticket.get());

        ordersRepository.save(order);

        return new ResponseEntity<>("Order created.", HttpStatus.OK);
    }

    public OrderResponse getOrderById(Long orderId) {
        Optional<Order> order = ordersRepository.findById(orderId);
        return order.isPresent() ? new OrderResponse(order.get()) : null;
    }

    public ResponseEntity<?> editOrder(Long orderId, OrderEditRequest orderEditRequest) {
        Optional<Order> order = ordersRepository.findById(orderId);

        Optional<Client> client = clientsRepository.findClientByFirstName(orderEditRequest.getClient());
        Optional<Flight> flight = flightsRepository.findByPlanePlaneModel(orderEditRequest.getFlight());
        Optional<Ticket> ticket = ticketsRepository.findBySeatNumber(orderEditRequest.getTicket());

        if(!client.isPresent() || !flight.isPresent() || !ticket.isPresent())
            return new ResponseEntity<>("Given order data is wrong!", HttpStatus.BAD_REQUEST);

        if (order.isPresent()) {
            if (orderEditRequest.getBaggageWeight() != 0)
                order.get().setBaggageWeight(orderEditRequest.getBaggageWeight());
            if (orderEditRequest.getClient() != null)
                order.get().setClient(client.get());
            if (orderEditRequest.getFlight() != null)
                order.get().setFlight(flight.get());
            if (orderEditRequest.getTicket() != null)
                order.get().setTicket(ticket.get());
            if (orderEditRequest.getFlightClass() != null)
                order.get().setFlightClass(orderEditRequest.getFlightClass());

            ordersRepository.save(order.get());

            return new ResponseEntity<>("Order with given id edited correctly.", HttpStatus.OK);
        }

        return new ResponseEntity<>("Order with given id doesnt exists.", HttpStatus.NOT_FOUND);
    }
}
