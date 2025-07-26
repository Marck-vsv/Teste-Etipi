package com.marckvsv.reclame_ali_backend.complaints.infrastructure.exceptions;

import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.ApplicationValidationException;

public class ComplaintNotFoundException extends ApplicationValidationException {
    public ComplaintNotFoundException(String complaintNotFound) {
        super(complaintNotFound);
    }
}
