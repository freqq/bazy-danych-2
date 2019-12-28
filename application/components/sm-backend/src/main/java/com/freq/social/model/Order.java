package com.freq.social.model;

import com.freq.social.model.user.User;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private User user;
    private Flight flight;
    private Ticket ticket;
    private int baggageWeight;

    @NotNull
    private String flightClass;
}
