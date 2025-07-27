package com.marckvsv.reclame_ali_backend.administration.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateAccountRequest {
    @NotBlank
    @Size(min = 1, max = 50)
    private String name;

    @CPF
    @NotBlank
    private String cpf;

    @NotBlank
    @Size(min = 8, max = 32)
    private String password;
}
