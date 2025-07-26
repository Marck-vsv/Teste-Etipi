package com.marckvsv.reclame_ali_backend.complaints.application;

import com.marckvsv.reclame_ali_backend.complaints.api.dto.UpdateComplaintRequest;

public interface IComplaint {
    void updateData(UpdateComplaintRequest request);
}
