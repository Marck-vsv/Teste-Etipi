package com.marckvsv.reclame_ali_backend.dto.complaint;

public record CreateComplaintDTO(
        String cpf,
        String title,
        String description
) {}
