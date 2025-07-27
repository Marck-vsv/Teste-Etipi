package com.marckvsv.reclame_ali_backend.complaints.api;

import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.ApplicationValidationException;
import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.BussinessValidationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "com.marckvsv.reclame_ali_backend.complaints")
public class ComplaintExceptionHandler {

    @ExceptionHandler(BussinessValidationException.class)
    public ResponseEntity<String> handleComplaintNotFoundException(BussinessValidationException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(ApplicationValidationException.class)
    public ResponseEntity<String> handleComplaintNotFoundException(ApplicationValidationException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
}
