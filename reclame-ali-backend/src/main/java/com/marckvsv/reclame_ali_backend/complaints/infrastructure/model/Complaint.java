package com.marckvsv.reclame_ali_backend.complaints.infrastructure.model;

import com.marckvsv.reclame_ali_backend.administration.infrastructure.models.User;
import com.marckvsv.reclame_ali_backend.sharedKernel.domain.ComplaintStatus;
import com.marckvsv.reclame_ali_backend.complaints.domain.DomainComplaint;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@ToString
@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Complaint {
    @Id
    @UuidGenerator
    @Column(unique = true, nullable = false)
    private UUID complaintId;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 512)
    private String description;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus complaintStatus;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public static DomainComplaint domainComplaintMapper(Complaint complaint) {
        if (complaint == null) {
            return null;
        }
        if (complaint.getUser() == null || complaint.getTitle() == null ||
                complaint.getDescription() == null || complaint.getComplaintStatus() == null) {
            throw new IllegalArgumentException("Campos obrigatórios não podem ser nulos");
        }

        DomainComplaint domainComplaint = new DomainComplaint();

        domainComplaint.setComplaintId(complaint.getComplaintId());
        domainComplaint.setTitle(complaint.getTitle());
        domainComplaint.setDescription(complaint.getDescription());
        domainComplaint.setComplaintStatus(complaint.getComplaintStatus());

        return domainComplaint;
    }

    public static Complaint complaintMapper(DomainComplaint complaint, User user) {
        if (complaint == null) {
            return null;
        }
        if (complaint.getComplaintId() == null || complaint.getTitle() == null ||
                complaint.getDescription() == null || complaint.getComplaintStatus() == null) {
            throw new IllegalArgumentException("Campos obrigatórios não podem ser nulos");
        }

        Complaint newComplaint = new Complaint();

        newComplaint.setComplaintId(complaint.getComplaintId());
        newComplaint.setTitle(complaint.getTitle());
        newComplaint.setDescription(complaint.getDescription());
        newComplaint.setComplaintStatus(complaint.getComplaintStatus());
        newComplaint.setUser(user);

        return newComplaint;
    }
}
