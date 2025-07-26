package com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions;

public class ApplicationValidationException extends RuntimeException {
    public ApplicationValidationException(String complaintNotFound) {
        super(complaintNotFound);
    }
}
