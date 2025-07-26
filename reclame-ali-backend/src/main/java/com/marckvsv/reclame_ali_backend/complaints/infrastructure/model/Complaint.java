package com.marckvsv.reclame_ali_backend.complaints.infrastructure.model;

import com.marckvsv.reclame_ali_backend.sharedKernel.domain.ComplaintStatus;
import com.marckvsv.reclame_ali_backend.complaints.domain.DomainComplaint;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Complaint {
    @Id
    @UuidGenerator
    @Column(unique = true, nullable = false, length = 36)
    private UUID complaintId;

    @Column(nullable = false, updatable = false)
    private UUID userId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 512)
    private String description;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Complaint(UUID userId, String title, String description, ComplaintStatus status) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.status = status;
    }

    // Todo: Verificar se os valores não são nulos
    public static DomainComplaint domainComplaintMapper(Complaint complaint) {
        return new DomainComplaint(complaint.getUserId(), complaint.getTitle(), complaint.getDescription(), complaint.getStatus());
    }

    public static Complaint complaintMapper(DomainComplaint complaint) {
        return new Complaint(complaint.getComplaintId(), complaint.getTitle(), complaint.getDescription(), complaint.getStatus());
    }
}
