package com.marckvsv.reclame_ali_backend.application;

import com.marckvsv.reclame_ali_backend.controller.UserService;
import com.marckvsv.reclame_ali_backend.domain.user.User;
import com.marckvsv.reclame_ali_backend.dto.user.CreateUserDTO;
import com.marckvsv.reclame_ali_backend.infra.repository.UserRepository;

public class UserServiceImpl implements UserService {
    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void createUser(CreateUserDTO dto) {
        User user = new User(dto.cpf(), dto.name(),  dto.password());
        repository.save(user);
    }
}
