package com.marckvsv.reclame_ali_backend.complaints.infrastructure.exceptions;

import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.ApplicationValidationException;
import org.springframework.http.HttpStatus;

public class ComplaintNotFoundException extends ApplicationValidationException {
    public ComplaintNotFoundException(HttpStatus httpStatus, String s) {
        super(httpStatus, s);
    }
}
