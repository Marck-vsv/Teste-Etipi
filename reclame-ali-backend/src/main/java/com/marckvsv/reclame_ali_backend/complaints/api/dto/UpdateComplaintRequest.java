package com.marckvsv.reclame_ali_backend.complaints.api.dto;

import com.marckvsv.reclame_ali_backend.sharedKernel.domain.ComplaintStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateComplaintRequest {
    private String title;
    private String description;
    private ComplaintStatus complaintStatus;
}
