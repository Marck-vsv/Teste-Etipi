package com.marckvsv.reclame_ali_backend.complaints.application;

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
public class ApplicationClient implements IComplaintApplication {

    private final IJWTUtils jwtUtils;
    private final IComplaintRepository repository;

    @Override
    public void createComplaint(CreateComplaintCommand command) {
        UUID userID = jwtUtils.decode(command.getJwt());

        repository.createCompliant(userID, command.getCreateComplaintRequest());

    }

    @Override
    public ComplaintResponse updateComplaint(UpdateComplaintCommand command) {
        return repository.UpdateComplaint(command);
    }

    @Override
    public void delete(DeleteComplaintCommand id) {
        repository.delete(id);
    }

    @Override
    public Page<ComplaintResponse> getSummaryPage(PageSummaryQuery query) {
        return repository.getPage(query);
    }

    @Override
    public ComplaintResponse getComplaint(GetComplaintQuery query) {
        return repository.findById(query.getComplaintID());
    }
}
