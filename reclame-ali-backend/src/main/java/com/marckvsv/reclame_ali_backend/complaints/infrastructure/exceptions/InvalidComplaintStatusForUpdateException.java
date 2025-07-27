package com.marckvsv.reclame_ali_backend.complaints.infrastructure.exceptions;

import com.marckvsv.reclame_ali_backend.sharedKernel.application.exceptions.BussinessValidationException;
import org.springframework.http.HttpStatus;

public class InvalidComplaintStatusForUpdateException extends BussinessValidationException {
    public InvalidComplaintStatusForUpdateException(HttpStatus httpStatus, String s) {
        super(httpStatus, s);
    }
}
