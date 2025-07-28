package com.marckvsv.reclame_ali_backend.administration.api;

import com.marckvsv.reclame_ali_backend.administration.infrastructure.exceptions.NAuthenticationException;
import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.ApplicationValidationException;
import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.BussinessValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.security.core.AuthenticationException;

@RestControllerAdvice(basePackages = "com.marckvsv.reclame_ali_backend.administration")
public class AdministrationExceptionHandler {

    @ExceptionHandler(BussinessValidationException.class)
    public ResponseEntity<String> handleBussinessValidationException(BussinessValidationException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(ApplicationValidationException.class)
    public ResponseEntity<String> handleApplicationValidationException(ApplicationValidationException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String errorMessage = e.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .reduce("", (acc, message) -> acc + message + "; ");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @ExceptionHandler(NAuthenticationException.class)
    public ResponseEntity<String> handleNAuthenticationException(NAuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
}
