package com.marckvsv.reclame_ali_backend.application;

import com.marckvsv.reclame_ali_backend.controller.ComplaintService;
import com.marckvsv.reclame_ali_backend.domain.complaint.Complaint;
import com.marckvsv.reclame_ali_backend.dto.complaint.*;
import com.marckvsv.reclame_ali_backend.infra.repository.ComplaintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository repository;

    @Override
    public ResponseComplaintDTO create(CreateComplaintDTO dto, String cpf) {
        Complaint complaint = new Complaint(dto.title(), dto.description(), cpf);
        Complaint saved = repository.save(complaint);
        return new ResponseComplaintDTO(saved.getCpf(), saved.getTitle(), saved.getDescription());
    }

    @Override
    public List<ResponseComplaintDTO> findAllByCpf(String cpf) {
        return repository.findAllByCpf(cpf).stream()
                .map(c -> new ResponseComplaintDTO(c.getCpf(), c.getTitle(), c.getDescription()))
                .collect(Collectors.toList());
    }

    @Override
    public ResponseComplaintDTO getOne(Long id) {
        Complaint complaint = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reclamação não encontrada"));
        return new ResponseComplaintDTO(complaint.getCpf(), complaint.getTitle(), complaint.getDescription());
    }

    @Override
    public ResponseComplaintDTO updateComplaintBody(UpdateComplaintDTO dto) {
        Complaint complaint = repository.findById(dto.id())
                .orElseThrow(() -> new RuntimeException("Reclamação não encontrada"));

        complaint.setTitle(dto.title());
        complaint.setDescription(dto.description());

        Complaint updated = repository.save(complaint);
        return new ResponseComplaintDTO(updated.getCpf(), updated.getTitle(), updated.getDescription());
    }

    @Override
    public void updateComplaintStatus(UpdateComplaintStatusDTO dto) {
        Complaint complaint = repository.findById(dto.id())
                .orElseThrow(() -> new RuntimeException("Reclamação não encontrada"));
        complaint.setStatus(dto.status());
        repository.save(complaint);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
