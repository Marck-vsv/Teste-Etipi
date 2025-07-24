package com.marckvsv.reclame_ali_backend.controller;

import com.marckvsv.reclame_ali_backend.dto.complaint.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaint")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping
    public ResponseEntity<ResponseComplaintDTO> create(@RequestBody CreateComplaintDTO dto) {
        ResponseComplaintDTO created = complaintService.create(dto, dto.cpf());
        return ResponseEntity.ok(created);
    }

    @GetMapping("/findallbycpf/{cpf}")
    public ResponseEntity<List<ResponseComplaintDTO>> findAllByCpf(@PathVariable String cpf) {
        List<ResponseComplaintDTO> list = complaintService.findAllByCpf(cpf);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/getone/{id}")
    public ResponseEntity<ResponseComplaintDTO> getOne(@PathVariable Long id) {
        ResponseComplaintDTO complaint = complaintService.getOne(id);
        return ResponseEntity.ok(complaint);
    }

    @PatchMapping("/update")
    public ResponseEntity<ResponseComplaintDTO> updateComplaintBody(@RequestBody UpdateComplaintDTO dto) {
        ResponseComplaintDTO updated = complaintService.updateComplaintBody(dto);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/updatestatus")
    public ResponseEntity<Void> updateComplaintStatus(@RequestBody UpdateComplaintStatusDTO dto) {
        complaintService.updateComplaintStatus(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable Long id) {
        complaintService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
