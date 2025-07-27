package com.marckvsv.reclame_ali_backend.administration.api.command;

import com.marckvsv.reclame_ali_backend.administration.api.dto.LoginRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CreateAuthenticationTokenCommand {
    private LoginRequest loginRequest;
}
