package com.freq.airline.model;

import com.freq.airline.model.date.DateAudit;
import com.freq.airline.model.user.roles.Role;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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
    private Long id;

    @NotNull
    @Size(max = 30)
    private String firstName;

    @NotNull
    @Size(max = 30)
    private String lastName;

    @Size(max = 11)
    private String pesel;

    private Date birthday;

    private boolean isDiscount;

    private String email;

    private String IDNumber;

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
