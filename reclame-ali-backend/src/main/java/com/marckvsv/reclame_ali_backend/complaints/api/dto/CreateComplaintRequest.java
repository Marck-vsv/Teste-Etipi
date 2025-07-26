package com.marckvsv.reclame_ali_backend.complaints.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class CreateComplaintRequest {
    private String title;
    private String description;
}
