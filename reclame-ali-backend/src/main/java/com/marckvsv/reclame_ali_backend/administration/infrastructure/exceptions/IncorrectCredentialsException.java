package com.marckvsv.reclame_ali_backend.administration.infrastructure.exceptions;

import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.ApplicationValidationException;
import org.springframework.http.HttpStatus;

public class IncorrectCredentialsException extends ApplicationValidationException {
    public IncorrectCredentialsException(HttpStatus status, String s) {
        super(status, s);
    }
}
