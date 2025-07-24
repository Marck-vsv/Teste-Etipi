package com.marckvsv.reclame_ali_backend.dto.complaint;

import com.marckvsv.reclame_ali_backend.domain.complaint.ComplaintStatus;

public record UpdateComplaintStatusDTO(
        Long id,
        ComplaintStatus status
) {}
