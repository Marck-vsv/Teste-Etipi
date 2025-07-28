package com.marckvsv.reclame_ali_backend.administration.api;

import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAccountCommand;
import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAuthenticationTokenCommand;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.exceptions.NAuthenticationException;

public interface IUserApplication {
    String createAuthenticationToken(CreateAuthenticationTokenCommand command) throws NAuthenticationException;

    Void createAccount(CreateAccountCommand command);
}
