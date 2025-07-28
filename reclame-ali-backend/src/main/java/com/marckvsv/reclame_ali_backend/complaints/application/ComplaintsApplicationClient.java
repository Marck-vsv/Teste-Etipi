package com.marckvsv.reclame_ali_backend.complaints.application;

import com.marckvsv.reclame_ali_backend.administration.security.configuration.jwt.IJWTUtils;
import com.marckvsv.reclame_ali_backend.complaints.api.IComplaintApplication;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.CreateComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.DeleteComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.UpdateComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query.GetComplaintQuery;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query.PageSummaryQuery;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.ComplaintResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ComplaintsApplicationClient implements IComplaintApplication {

    private final IJWTUtils jwtUtils;
    private final IComplaintRepository repository;

    @Override
    public void createComplaint(CreateComplaintCommand command) {
        UUID userID = UUID.fromString(command.getUserId());

        repository.createCompliant(userID, command.getCreateComplaintRequest());

    }

    @Override
    public ComplaintResponse updateComplaint(UpdateComplaintCommand command) {
        return repository.updateComplaint(command);
    }

    @Override
    public void delete(DeleteComplaintCommand id) {
        repository.delete(id);
    }

    @Override
    public Page<ComplaintResponse> getSummaryPage(PageSummaryQuery query) {
        UUID userID = UUID.fromString(query.getUserId());

        return repository.getPage(query, userID);
    }

    @Override
    public ComplaintResponse getComplaint(GetComplaintQuery query) {
        return repository.findById(query.getComplaintID());
    }
}
