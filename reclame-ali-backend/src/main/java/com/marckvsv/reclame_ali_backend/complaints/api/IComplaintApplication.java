package com.marckvsv.reclame_ali_backend.complaints.api;

import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.CreateComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.DeleteComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.UpdateComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query.GetComplaintQuery;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query.PageSummaryQuery;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.ComplaintResponse;
import org.springframework.data.domain.Page;

public interface IComplaintApplication {
    void createComplaint(CreateComplaintCommand command);

    ComplaintResponse updateComplaint(UpdateComplaintCommand command);

    void delete(DeleteComplaintCommand id);

    Page<ComplaintResponse> getSummaryPage(PageSummaryQuery query);

    ComplaintResponse getComplaint(GetComplaintQuery query);
}
