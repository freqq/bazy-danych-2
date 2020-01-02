package com.freq.airline.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Data
@Table(name = "clients", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "pesel",
                "IDNumber"
        })
})
public class Client  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @NotNull
    @Size(max = 30)
    public String firstName;

    @NotNull
    @Size(max = 30)
    public String lastName;

    @Size(max = 11)
    public String pesel;

    public Date birthday;

    public boolean isDiscount;

    public String email;

    public String IDNumber;

    public Client() {}

    public Client(Long id, String firstName, String lastName, String pesel, Date birthday, boolean isDiscount, String email, String IDNumber) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pesel = pesel;
        this.birthday = birthday;
        this.isDiscount = isDiscount;
        this.email = email;
        this.IDNumber = IDNumber;
    }
}
