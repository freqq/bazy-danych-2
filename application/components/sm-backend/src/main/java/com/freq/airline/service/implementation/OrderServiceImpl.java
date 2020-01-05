package com.freq.airline.service.implementation;

import com.freq.airline.model.*;
import com.freq.airline.payload.*;
import com.freq.airline.repository.*;
import com.freq.airline.service.OrdersService;
import com.freq.airline.utils.DataSet;
import com.freq.airline.utils.PlaneCount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrdersService {
    private int ORDERS_COUNT = 10;
    private OrdersRepository ordersRepository;
    private ClientsRepository clientsRepository;
    private FlightsRepository flightsRepository;
    private TicketsRepository ticketsRepository;
    private PlanesRepository planesRepository;

    @Autowired
    public OrderServiceImpl(OrdersRepository ordersRepository, ClientsRepository clientsRepository,
                            FlightsRepository flightsRepository, TicketsRepository ticketsRepository,
                            PlanesRepository planesRepository) {
        this.ordersRepository = ordersRepository;
        this.clientsRepository = clientsRepository;
        this.flightsRepository = flightsRepository;
        this.planesRepository = planesRepository;
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
        Optional<Client> client = null;
        Optional<Flight> flight = null;
        Optional<Ticket> ticket = null;

        if (orderEditRequest.getClient() != null)
            client = clientsRepository.findById(orderEditRequest.getClient());
        if (orderEditRequest.getFlight() != null)
            flight = flightsRepository.findById(orderEditRequest.getFlight());
        if (orderEditRequest.getTicket() != null)
            ticket = ticketsRepository.findById(orderEditRequest.getTicket());

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

    public ChartData getValuableFlightsChartData() {
        ChartData valuableFlightsChartData = new ChartData();

        List<Order> orders = ordersRepository.findAll();
        Collections.sort(orders, (o1, o2) ->o2.getTicket().getPrice() - (o1.getTicket().getPrice()));
        List<Order> limitedOrders = orders.stream().limit(ORDERS_COUNT).collect(Collectors.toList());
        List<String> labels = new ArrayList<>();
        List<DataSet> dataSets = new ArrayList<>();
        List<Integer> data = new ArrayList<>();
        List<String> backgroundColors = new ArrayList<>();

        for(Order order : limitedOrders) {
            labels.add(order.getClient().getFirstName() + " " + order.getClient().getLastName());
            data.add(order.getTicket().getPrice());
            backgroundColors.add("rgba("+getRandomValue(130, 200)+","+getRandomValue(180,210)+","
                    +getRandomValue(150,255)+","+getRandomFloatValue()+")");
        }

        DataSet dataSet = new DataSet();
        dataSet.setLabel("Order price");
        dataSet.setData(data);
        dataSet.setBackgroundColor(backgroundColors);

        dataSets.add(dataSet);

        valuableFlightsChartData.setDatasets(dataSets);
        valuableFlightsChartData.setLabels(labels);

        return valuableFlightsChartData;
    }


    public ChartData getPlanesWithLargerstNumberOfFlights() {
        ChartData planesWithhLargerstNumberOfFlights = new ChartData();
        List<Plane> planes = planesRepository.findAll();
        List<PlaneCount> planeCounts = new ArrayList<>();

        for(Plane plane : planes)
            planeCounts.add(new PlaneCount(plane.getId(), planesRepository.getPlaneFlightsCount(plane.getId())));

        planeCounts.removeIf(planeCount -> planeCount.getPlaneCount() == 0);

        Collections.sort(planeCounts, (p1, p2) -> p2.getPlaneCount() - (p1.getPlaneCount()));

        List<String> labels = new ArrayList<>();
        List<DataSet> dataSets = new ArrayList<>();
        List<Integer> data = new ArrayList<>();
        List<String> backgroundColors = new ArrayList<>();

        for(PlaneCount planeCount : planeCounts) {
            labels.add(planesRepository.findById(planeCount.getPlaneId()).get().getPlaneModel());
            data.add(planeCount.getPlaneCount());
            backgroundColors.add("rgba("+getRandomValue(130, 200)+","+getRandomValue(180,210)+","
                    +getRandomValue(150,255)+","+getRandomFloatValue()+")");
        }

        DataSet dataSet = new DataSet();
        dataSet.setLabel("Flights count");
        dataSet.setData(data);
        dataSet.setBackgroundColor(backgroundColors);

        dataSets.add(dataSet);

        planesWithhLargerstNumberOfFlights.setDatasets(dataSets);
        planesWithhLargerstNumberOfFlights.setLabels(labels);

        return planesWithhLargerstNumberOfFlights;
    }

    public ChartData getLargestPlanes() {
        ChartData ordersChartData = new ChartData();
        List<Plane> planes = planesRepository.findAll();

        List<DataSet> dataSets = new ArrayList<>();
        List<String> labels = new ArrayList<>();

        Collections.sort(planes, (p1, p2) -> p2.getSeatsCount() - (p1.getSeatsCount()));
        List<Plane> limitedPlanes = planes.stream().limit(ORDERS_COUNT).collect(Collectors.toList());
        List<Integer> data = new ArrayList<>();
        List<String> backgroundColors = new ArrayList<>();

        for(Plane plane : limitedPlanes) {
            labels.add(plane.getPlaneModel());
            data.add(plane.getSeatsCount());
            backgroundColors.add("rgba("+getRandomValue(130, 200)+","+getRandomValue(180,210)+","
                    +getRandomValue(150,255)+","+getRandomFloatValue()+")");
        }

        DataSet dataSet = new DataSet();
        dataSet.setLabel("Seats count");
        dataSet.setData(data);
        dataSet.setBackgroundColor(backgroundColors);

        dataSets.add(dataSet);


        ordersChartData.setDatasets(dataSets);
        ordersChartData.setLabels(labels);

        return ordersChartData;
    }

    private int getRandomValue(int start, int end){
        return ThreadLocalRandom.current().nextInt(start, end + 1);
    }

    private double getRandomFloatValue(){
        double random;

        do{
            random = Math.random();
        } while (random < 0.5);

        return random;
    }
}
