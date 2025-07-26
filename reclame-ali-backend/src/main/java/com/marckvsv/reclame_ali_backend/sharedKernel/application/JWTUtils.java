package com.marckvsv.reclame_ali_backend.sharedKernel.application;

import com.marckvsv.reclame_ali_backend.complaints.application.IJWTUtils;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class JWTUtils implements IJWTUtils {
    @Override
    public UUID decode(String jwt) {
        return UUID.randomUUID();
    }
}
