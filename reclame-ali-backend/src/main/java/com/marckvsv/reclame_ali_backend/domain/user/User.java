package com.marckvsv.reclame_ali_backend.domain.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cpf;
    private String name;
    private String password;

    public User(String cpf, String name,  String password) {
        this.cpf = cpf;
        this.name = name;
        this.password = password;
    }
}
