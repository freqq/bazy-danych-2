package com.freq.social.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String destinationPlace;

    @NotNull
    private String startPlace;

    @NotNull
    private Date flightDate;

    private Carrier carrier;

    private Plane plane;
}
