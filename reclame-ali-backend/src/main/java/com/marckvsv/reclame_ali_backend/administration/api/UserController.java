package com.marckvsv.reclame_ali_backend.administration.api;

import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAccountCommand;
import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAuthenticationTokenCommand;
import com.marckvsv.reclame_ali_backend.administration.api.dto.CreateAccountRequest;
import com.marckvsv.reclame_ali_backend.administration.api.dto.LoginRequest;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.exceptions.NAuthenticationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/${api.version}/administration")
@RequiredArgsConstructor
public class UserController {
    private final IUserApplication userApplication;

    @PostMapping("/signin")
    public ResponseEntity<String> createAuthenticationToken(@Valid @RequestBody LoginRequest loginRequest) {
        var command = new CreateAuthenticationTokenCommand(loginRequest);

        return ResponseEntity.ok(userApplication.createAuthenticationToken(command));
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> createAccount(@Valid @RequestBody CreateAccountRequest createAccountRequest) {
        var command = new CreateAccountCommand(createAccountRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(userApplication.createAccount(command));
    }
}
