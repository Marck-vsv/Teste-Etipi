package com.marckvsv.reclame_ali_backend.dto.complaint;

import com.marckvsv.reclame_ali_backend.domain.complaint.Complaint;
import com.marckvsv.reclame_ali_backend.domain.complaint.ComplaintStatus;

import java.time.LocalDateTime;

public record ResponseComplaintDTO(
        Long id,
        String cpf,
        String title,
        String description,
        ComplaintStatus status,
        LocalDateTime createdAt
) {
    public static ResponseComplaintDTO from(Complaint complaint) {
        return new ResponseComplaintDTO(
                complaint.getId(),
                complaint.getCpf(),
                complaint.getTitle(),
                complaint.getDescription(),
                complaint.getStatus(),
                complaint.getCreatedAt()
        );
    }
}
