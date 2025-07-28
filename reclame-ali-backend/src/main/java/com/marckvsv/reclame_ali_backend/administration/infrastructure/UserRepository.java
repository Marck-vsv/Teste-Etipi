package com.marckvsv.reclame_ali_backend.administration.infrastructure;

import com.marckvsv.reclame_ali_backend.administration.application.IUserRepository;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.exceptions.UsernameNotFoundException;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.models.User;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.repository.UserJPARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserRepository implements IUserRepository {

    private final UserJPARepository userJPARepository;

    @Override
    public User findByID(String username) {
        return userJPARepository.findById(UUID.fromString(username)).orElseThrow(() -> new UsernameNotFoundException(HttpStatus.NOT_FOUND, "User with id: " + username + " not found"));
    }

    @Override
    public UUID getUUIDByCPF(String cpf) {
        User user = userJPARepository.findByCpf(cpf);
        return user != null ? user.getUserId() : null;
    }

    @Override
    public boolean existByCPF(String cpf) {
        return userJPARepository.existsByCpf(cpf);
    }

    @Override
    public void save(User user) {
        userJPARepository.save(user);
    }
}
