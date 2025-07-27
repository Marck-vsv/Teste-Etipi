package com.marckvsv.reclame_ali_backend.administration.application;

import com.marckvsv.reclame_ali_backend.administration.infrastructure.models.User;

import java.util.UUID;

public interface IUserRepository {
    User findByID(String username);

    UUID getUUIDByCPF(String cpf);

    boolean existByCFP();

    void save(User user);
}
