package com.freq.airline.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@Table(name = "flights")
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "carrier_id", nullable = false)
    private Carrier carrier;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "plane_id", nullable = false)
    private Plane plane;
}
