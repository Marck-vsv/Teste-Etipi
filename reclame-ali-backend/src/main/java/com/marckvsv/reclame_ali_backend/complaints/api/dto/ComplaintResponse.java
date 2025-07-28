package com.marckvsv.reclame_ali_backend.complaints.api.dto;

import com.marckvsv.reclame_ali_backend.complaints.infrastructure.model.Complaint;
import com.marckvsv.reclame_ali_backend.sharedKernel.domain.ComplaintStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ComplaintResponse {
    UUID uuid;
    String title;
    String description;
    ComplaintStatus complaintStatus;
    LocalDateTime createdAt;

    public static ComplaintResponse createResponse(Complaint complaint) {
        return new ComplaintResponse(complaint.getComplaintId(), complaint.getTitle(), complaint.getDescription(), complaint.getComplaintStatus(), complaint.getCreatedAt());
    }
}
