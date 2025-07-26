package com.marckvsv.reclame_ali_backend.complaints.infrastructure.repository;


import com.marckvsv.reclame_ali_backend.complaints.infrastructure.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JPAComplaintRepository extends JpaRepository<Complaint, UUID> {
}
