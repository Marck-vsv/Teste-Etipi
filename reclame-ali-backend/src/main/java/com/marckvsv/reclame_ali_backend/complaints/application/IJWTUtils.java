package com.marckvsv.reclame_ali_backend.complaints.application;

import java.util.UUID;

public interface IJWTUtils {
    UUID decode(String jwt);
}
