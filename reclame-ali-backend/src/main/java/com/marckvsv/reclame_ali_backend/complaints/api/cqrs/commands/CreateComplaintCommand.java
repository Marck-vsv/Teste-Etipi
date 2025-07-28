package com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands;

import com.marckvsv.reclame_ali_backend.complaints.api.dto.CreateComplaintRequest;
import com.marckvsv.reclame_ali_backend.sharedKernel.application.command.BaseCommand;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateComplaintCommand extends BaseCommand {

    public CreateComplaintCommand(CreateComplaintRequest request, String userId) {
        this.userId = userId;
        this.createComplaintRequest = request;
    }

    private String userId;
    CreateComplaintRequest createComplaintRequest;
}
