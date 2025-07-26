package com.marckvsv.reclame_ali_backend.complaints.domain;

import com.marckvsv.reclame_ali_backend.complaints.api.dto.UpdateComplaintRequest;
import com.marckvsv.reclame_ali_backend.complaints.application.IComplaint;
import com.marckvsv.reclame_ali_backend.sharedKernel.domain.ComplaintStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DomainComplaint implements IComplaint {
    private UUID complaintId;
    private String title;
    private String description;
    private ComplaintStatus status;

    @Override
    public void updateData(UpdateComplaintRequest request) {
        this.title = request.getTitle();
        this.description = request.getDescription();
        this.status = request.getComplaintStatus();
    }
}
