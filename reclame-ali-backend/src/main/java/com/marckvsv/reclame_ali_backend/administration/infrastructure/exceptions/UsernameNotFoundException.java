package com.marckvsv.reclame_ali_backend.administration.infrastructure.exceptions;

import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.ApplicationValidationException;
import org.springframework.http.HttpStatus;

public class UsernameNotFoundException extends ApplicationValidationException {
    public UsernameNotFoundException(HttpStatus status, String s) {
        super(status, s);
    }
}
