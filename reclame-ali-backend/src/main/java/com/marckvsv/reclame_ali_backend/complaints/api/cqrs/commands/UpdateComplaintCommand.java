package com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands;

import com.marckvsv.reclame_ali_backend.complaints.api.dto.UpdateComplaintRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateComplaintCommand {
    public UpdateComplaintCommand(UpdateComplaintRequest request, UUID id) {
        this.complainID = id;
        this.request = request;
    }
    private UUID complainID;
    private UpdateComplaintRequest request;
}
