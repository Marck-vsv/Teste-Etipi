package com.marckvsv.reclame_ali_backend.administration.api.command;

import com.marckvsv.reclame_ali_backend.administration.api.dto.CreateAccountRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreateAccountCommand {
    private CreateAccountRequest createAccountRequest;
}
