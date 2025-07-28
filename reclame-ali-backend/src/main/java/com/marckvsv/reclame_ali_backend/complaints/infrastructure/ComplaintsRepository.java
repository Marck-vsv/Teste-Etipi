package com.marckvsv.reclame_ali_backend.complaints.infrastructure;

import com.marckvsv.reclame_ali_backend.administration.application.IUserRepository;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.models.User;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.DeleteComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.UpdateComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query.PageSummaryQuery;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.ComplaintResponse;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.CreateComplaintRequest;
import com.marckvsv.reclame_ali_backend.complaints.application.IComplaintRepository;
import com.marckvsv.reclame_ali_backend.complaints.domain.DomainComplaint;
import com.marckvsv.reclame_ali_backend.complaints.infrastructure.exceptions.ComplaintNotFoundException;
import com.marckvsv.reclame_ali_backend.complaints.infrastructure.exceptions.InvalidComplaintStatusForDeletionException;
import com.marckvsv.reclame_ali_backend.complaints.infrastructure.exceptions.InvalidComplaintStatusForUpdateException;
import com.marckvsv.reclame_ali_backend.complaints.infrastructure.model.Complaint;
import com.marckvsv.reclame_ali_backend.complaints.infrastructure.repository.JPAComplaintRepository;
import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.ApplicationValidationException;
import com.marckvsv.reclame_ali_backend.sharedKernel.domain.ComplaintStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ComplaintsRepository implements IComplaintRepository {

    private final JPAComplaintRepository repository;
    private final IUserRepository userRepository;

    @Override
    public ComplaintResponse findById(UUID complainID) {
        return repository.findById(complainID).map(ComplaintResponse::createResponse).orElseThrow(() -> new ComplaintNotFoundException(HttpStatus.NOT_FOUND, "Complaint not found"));
    }

    @Override
    public void delete(DeleteComplaintCommand command) {
        UUID complaintID = command.getComplaintUUID();

        Complaint complaint = repository.findById(complaintID).orElseThrow(() -> new ComplaintNotFoundException(HttpStatus.NOT_FOUND, "Complaint with uuid: " + complaintID + " not found"));

        if (complaint.getComplaintStatus() != ComplaintStatus.PENDENTE) {
            throw new InvalidComplaintStatusForDeletionException(HttpStatus.CONFLICT, "Complaint with uuid: " + complaintID + " can only be deleted if its complaintStatus is PENDENTE.");
        }

        repository.deleteById(command.getComplaintUUID());
    }

    @Override
    public Page<ComplaintResponse> getPage(PageSummaryQuery query, UUID userID) {
        var pageable = PageRequest.of(query.getPage(), query.getSize());

        Complaint exampleObjectForSearch = new Complaint();
        exampleObjectForSearch.setUser(new User());
        exampleObjectForSearch.getUser().setUserId(userID);

        ExampleMatcher exampleMatcher = ExampleMatcher.matching()
                .withIgnoreNullValues();

        return repository.findAll(Example.of(exampleObjectForSearch, exampleMatcher), pageable).map(ComplaintResponse::createResponse);
    }

    @Override
    public void createCompliant(UUID userID, CreateComplaintRequest request) {
        var compliant = new Complaint();
        compliant.setUser(userRepository.findByID(userID.toString()));
        compliant.setComplaintStatus(ComplaintStatus.PENDENTE);
        compliant.setDescription(request.getDescription());
        compliant.setTitle(request.getTitle());

        repository.save(compliant);
    }

    @Override
    public ComplaintResponse updateComplaint(UpdateComplaintCommand command) {
        UUID complaintID = command.getComplainID();

        Complaint complaintEntity = repository.findById(complaintID).orElseThrow(() -> new ApplicationValidationException(HttpStatus.NOT_FOUND, "Complaint with UUID: " + complaintID + " not found"));

        if (complaintEntity.getComplaintStatus() != ComplaintStatus.PENDENTE) {
            throw new InvalidComplaintStatusForUpdateException(HttpStatus.CONFLICT, "Complaint with id " + complaintID + " can only be deleted if its complaintStatus is PENDENTE.");
        }

        DomainComplaint complaint = Complaint.domainComplaintMapper(complaintEntity);

        if (command.getRequest().getComplaintStatus() == null) {
            command.getRequest().setComplaintStatus(complaintEntity.getComplaintStatus());
        }

        complaint.updateData(command.getRequest());


        return ComplaintResponse.createResponse(repository.save(Complaint.complaintMapper(complaint, complaintEntity.getUser())));
    }
}
