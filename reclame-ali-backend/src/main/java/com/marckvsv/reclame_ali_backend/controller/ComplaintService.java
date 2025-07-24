package com.marckvsv.reclame_ali_backend.controller;

import com.marckvsv.reclame_ali_backend.dto.complaint.*;

import java.util.List;

public interface ComplaintService {
    ResponseComplaintDTO create(CreateComplaintDTO dto, String cpf);
    List<ResponseComplaintDTO> findAllByCpf(String cpf);
    ResponseComplaintDTO getOne(Long id);
    ResponseComplaintDTO updateComplaintBody(UpdateComplaintDTO dto);
    void updateComplaintStatus(UpdateComplaintStatusDTO dto);
    void delete(Long id);
}
