package com.freq.airline.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "planes")
public class Plane {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @NotNull
    public String planeModel;

    public int seatsCount;
}
