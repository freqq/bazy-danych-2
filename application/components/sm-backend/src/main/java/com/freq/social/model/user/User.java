package com.freq.social.model.user;

import com.freq.social.model.date.DateAudit;
import com.freq.social.model.user.roles.Role;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "pesel",
                "IDNumber"
        })
})
public class User extends DateAudit {
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

    private String IDNumer;

    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User() {}


    public User(@NotNull @Size(max = 30) String firstName, @NotNull @Size(max = 30) String lastName,
                @Size(max = 11) String pesel, Date birthday, boolean isDiscount, String email,
                String IDNumer, Set<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.pesel = pesel;
        this.birthday = birthday;
        this.isDiscount = isDiscount;
        this.email = email;
        this.IDNumer = IDNumer;
        this.roles = roles;
    }
}
