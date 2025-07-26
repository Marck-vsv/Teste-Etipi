package com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteComplaintCommand {
    private UUID complaintUUID;
}
