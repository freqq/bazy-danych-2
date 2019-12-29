package com.freq.airline.model.user.roles;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 50)
    private RoleName name;

    private Role(){}

    public Long getId() {
        return id;
    }

    public RoleName getRoleName() {
        return name;
    }

    public void setRoleName(RoleName roleName) {
        this.name = roleName;
    }
}
