package com.marckvsv.reclame_ali_backend.administration.infrastructure.exceptions;

import org.springframework.http.HttpStatus;

public class NAuthenticationException extends RuntimeException {
    public NAuthenticationException(HttpStatus status, String s) {
        super();
    }
}
