package com.marckvsv.reclame_ali_backend.administration.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAccountCommand;
import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAuthenticationTokenCommand;
import com.marckvsv.reclame_ali_backend.administration.api.dto.CreateAccountRequest;
import com.marckvsv.reclame_ali_backend.administration.api.dto.LoginRequest;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.exceptions.NAuthenticationException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import com.marckvsv.reclame_ali_backend.administration.security.configuration.jwt.JWTRequestFilter;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(
        controllers = UserController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class
        },
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = JWTRequestFilter.class
        )
)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IUserApplication userApplication;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Deve registrar uma nova conta com sucesso e retornar 201 Created")
    void createAccount_shouldReturn201Created_whenAccountIsCreatedSuccessfully() throws Exception {
        CreateAccountRequest request = new CreateAccountRequest("John Doe", "19908501038", "securepassword");

        doNothing().when(userApplication).createAccount(any(CreateAccountCommand.class));

        mockMvc.perform(post("/api/v1/administration/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(userApplication, times(1)).createAccount(any(CreateAccountCommand.class));
    }

    @Test
    @DisplayName("Deve retornar 400 Bad Request quando o nome na requisição de signup é em branco")
    void createAccount_shouldReturn400BadRequest_whenNameIsBlank() throws Exception {
        CreateAccountRequest request = new CreateAccountRequest("", "50269415004", "securepassword");

        mockMvc.perform(post("/api/v1/administration/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(userApplication, never()).createAccount(any(CreateAccountCommand.class));
    }

    @Test
    @DisplayName("Deve retornar 400 Bad Request quando o CPF na requisição de signup é inválido")
    void createAccount_shouldReturn400BadRequest_whenCpfIsInvalid() throws Exception {
        CreateAccountRequest request = new CreateAccountRequest("John Doe", "123", "securepassword");

        mockMvc.perform(post("/api/v1/administration/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(userApplication, never()).createAccount(any(CreateAccountCommand.class));
    }

    @Test
    @DisplayName("Deve autenticar um usuário com sucesso e retornar 200 OK com token")
    void createAuthenticationToken_shouldReturn200OK_whenAuthenticationIsSuccessful() throws Exception {
        LoginRequest request = new LoginRequest("19908501038", "securepassword");
        String expectedToken = "mocked-jwt-token-example-from-application-layer";

        when(userApplication.createAuthenticationToken(any(CreateAuthenticationTokenCommand.class)))
                .thenReturn(expectedToken);

        mockMvc.perform(post("/api/v1/administration/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedToken));

        verify(userApplication, times(1)).createAuthenticationToken(any(CreateAuthenticationTokenCommand.class));
    }

    @Test
    @DisplayName("Deve retornar 401 Unauthorized quando a autenticação falha (credenciais inválidas)")
    void createAuthenticationToken_shouldReturn401Unauthorized_whenAuthenticationFails() throws Exception {
        LoginRequest request = new LoginRequest("19908501038", "wrongpassword");

        when(userApplication.createAuthenticationToken(any(CreateAuthenticationTokenCommand.class)))
                .thenThrow(new NAuthenticationException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas fornecidas."));

        mockMvc.perform(post("/api/v1/administration/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());

        verify(userApplication, times(1)).createAuthenticationToken(any(CreateAuthenticationTokenCommand.class));
    }

    @Test
    @DisplayName("Deve retornar 400 Bad Request quando o CPF na requisição de signin é em branco")
    void createAuthenticationToken_shouldReturn400BadRequest_whenCpfIsBlank() throws Exception {
        LoginRequest request = new LoginRequest("", "securepassword");

        mockMvc.perform(post("/api/v1/administration/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(userApplication, never()).createAuthenticationToken(any(CreateAuthenticationTokenCommand.class));
    }

    @Test
    @DisplayName("Deve retornar 400 Bad Request quando a senha na requisição de signin é muito curta")
    void createAuthenticationToken_shouldReturn400BadRequest_whenPasswordIsTooShort() throws Exception {
        LoginRequest request = new LoginRequest("19908501038", "short");

        mockMvc.perform(post("/api/v1/administration/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(userApplication, never()).createAuthenticationToken(any(CreateAuthenticationTokenCommand.class));
    }
}
