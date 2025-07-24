package com.marckvsv.reclame_ali_backend.domain.complaint;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String cpf;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    public Complaint(String title, String description, String cpf) {
        this.title = title;
        this.description = description;
        this.cpf = cpf;
        this.createdAt = LocalDateTime.now();
        this.status = ComplaintStatus.PENDENTE;
    }
}
