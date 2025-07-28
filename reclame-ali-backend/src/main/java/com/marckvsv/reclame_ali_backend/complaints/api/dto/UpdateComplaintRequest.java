package com.marckvsv.reclame_ali_backend.complaints.api.dto;

import com.marckvsv.reclame_ali_backend.sharedKernel.application.validation.Update;
import com.marckvsv.reclame_ali_backend.sharedKernel.domain.ComplaintStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class UpdateComplaintRequest {

    @NotBlank
    @Size(min = 1, max = 255)
    private String title;

    @NotBlank
    @Size(min = 1, max = 512)
    private String description;

    @NotNull(groups = Update.class)
    private ComplaintStatus complaintStatus;
}
