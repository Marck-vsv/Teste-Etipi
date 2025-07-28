package com.marckvsv.reclame_ali_backend.complaints.domain;

import com.marckvsv.reclame_ali_backend.complaints.api.dto.UpdateComplaintRequest;
import com.marckvsv.reclame_ali_backend.complaints.application.IComplaint;
import com.marckvsv.reclame_ali_backend.sharedKernel.domain.ComplaintStatus;
import lombok.*;

import java.util.UUID;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DomainComplaint implements IComplaint {
    private UUID complaintId;
    private String title;
    private String description;
    private ComplaintStatus complaintStatus;

    @Override
    public void updateData(UpdateComplaintRequest request) {
        this.title = request.getTitle();
        this.description = request.getDescription();
        this.complaintStatus = request.getComplaintStatus();
    }
}
