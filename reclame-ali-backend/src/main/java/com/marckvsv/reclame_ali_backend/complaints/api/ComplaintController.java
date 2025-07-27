package com.marckvsv.reclame_ali_backend.complaints.api;

import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.CreateComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.DeleteComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.commands.UpdateComplaintCommand;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query.GetComplaintQuery;
import com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query.PageSummaryQuery;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.ComplaintResponse;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.CreateComplaintRequest;
import com.marckvsv.reclame_ali_backend.complaints.api.dto.UpdateComplaintRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/${api.version}/complaint")
@RequiredArgsConstructor
public class ComplaintController {

    private final IComplaintApplication application;

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody CreateComplaintRequest request, @RequestHeader(name = "Authorization") String jwt) {
        var command = new CreateComplaintCommand(request, jwt);

        application.createComplaint(command);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<Page<ComplaintResponse>> pageableSummary(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size, @RequestHeader(name = "Authorization") String jwt) {
        var pageSummaryQuery = new PageSummaryQuery(page, size, jwt);

        return ResponseEntity.ok(application.getSummaryPage(pageSummaryQuery));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComplaintResponse> getComplaint(@PathVariable UUID id) {
        var query = new GetComplaintQuery(id);

        return ResponseEntity.ok(application.getComplaint(query));
    }

    @PatchMapping("/{uuid}")
    public ResponseEntity<ComplaintResponse> updateComplaint(@Valid @RequestBody UpdateComplaintRequest request, @PathVariable UUID uuid) {
        var command = new UpdateComplaintCommand(request, uuid);

        return ResponseEntity.ok(application.updateComplaint(command));
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable UUID uuid) {
        var command = new DeleteComplaintCommand(uuid);

        application.delete(command);

        return ResponseEntity.ok().build();
    }
}
