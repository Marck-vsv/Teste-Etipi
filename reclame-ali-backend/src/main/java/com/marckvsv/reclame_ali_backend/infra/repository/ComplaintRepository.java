package com.marckvsv.reclame_ali_backend.infra.repository;

import com.marckvsv.reclame_ali_backend.domain.complaint.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findAllByCpf(String cpf);
}
