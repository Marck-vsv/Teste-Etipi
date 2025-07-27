package com.marckvsv.reclame_ali_backend.administration.api;

import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAccountCommand;
import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAuthenticationTokenCommand;

public interface IUserApplication {
    String createAuthenticationToken(CreateAuthenticationTokenCommand command);

    Void createAccount(CreateAccountCommand command);
}
