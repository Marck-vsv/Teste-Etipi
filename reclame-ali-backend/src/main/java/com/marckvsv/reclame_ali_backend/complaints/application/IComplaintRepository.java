package com.marckvsv.reclame_ali_backend.complaints.application;

import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.DeleteComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.UpdateComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query.PageSummaryQuery;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.ComplaintResponse;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.CreateComplaintRequest;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface IComplaintRepository {

    ComplaintResponse findById(UUID complainID);

    void delete(DeleteComplaintCommand id);

    Page<ComplaintResponse> getPage(PageSummaryQuery query, UUID userID);

    void createCompliant(UUID userID, CreateComplaintRequest createComplaintRequest);

    ComplaintResponse updateComplaint(UpdateComplaintCommand command);

}
