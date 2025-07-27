package com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApplicationValidationException extends RuntimeException {
    private final HttpStatus status;

    public ApplicationValidationException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
