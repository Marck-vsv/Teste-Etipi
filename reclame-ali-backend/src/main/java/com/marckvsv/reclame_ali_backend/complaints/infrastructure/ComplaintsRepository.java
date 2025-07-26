package com.marckvsv.reclame_ali_backend.complaints.infrastructure;

import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.DeleteComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.UpdateComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query.PageSummaryQuery;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.ComplaintResponse;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.CreateComplaintRequest;
import com.marckvsv.reclame_ali_backend.complaints.application.IComplaintRepository;
import com.marckvsv.reclame_ali_backend.complaints.infrastructure.exceptions.ComplaintNotFoundException;
import com.marckvsv.reclame_ali_backend.complaints.infrastructure.model.Complaint;
import com.marckvsv.reclame_ali_backend.complaints.infrastructure.repository.JPAComplaintRepository;
import com.marckvsv.reclame_ali_backend.complaints.domain.DomainComplaint;
import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.ApplicationValidationException;
import com.marckvsv.reclame_ali_backend.sharedKernel.domain.ComplaintStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ComplaintsRepository implements IComplaintRepository {

    private final JPAComplaintRepository repository;

    @Override
    public ComplaintResponse findById(UUID complainID) {
        return repository.findById(complainID).map(ComplaintResponse::createResponse).orElseThrow(() -> new ComplaintNotFoundException("Complaint not found"));
    }

    @Override
    public void delete(DeleteComplaintCommand command) {
        repository.deleteById(command.getComplaintUUID());
    }

    @Override
    public Page<ComplaintResponse> getPage(PageSummaryQuery query) {
        var pageable = PageRequest.of(query.getPage(), query.getSize());

        return repository.findAll(pageable).map(ComplaintResponse::createResponse);
    }

    @Override
    public void createCompliant(UUID userID, CreateComplaintRequest request) {
        var compliant = new Complaint(userID, request.getTitle(), request.getDescription(), ComplaintStatus.PENDENTE);
        repository.save(compliant);
    }

    @Override
    public ComplaintResponse UpdateComplaint(UpdateComplaintCommand command) {
        DomainComplaint complaint = repository.findById(command.getComplainID()).map(Complaint::domainComplaintMapper).orElseThrow(() -> new ApplicationValidationException("Complaint not found"));

        complaint.updateData(command.getRequest());

        return ComplaintResponse.createResponse(repository.save(Complaint.complaintMapper(complaint)));
    }
}
