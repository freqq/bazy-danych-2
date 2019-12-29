package com.freq.airline.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "carriers", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "carrierName"
        })
})
@Data
public class Carrier {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String carrierName;
}
