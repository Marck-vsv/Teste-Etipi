package com.marckvsv.reclame_ali_backend.administration.infrastructure;

import com.marckvsv.reclame_ali_backend.administration.application.IUserRepository;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.models.User;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.repository.UserJPARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserRepository implements IUserRepository {

    private final UserJPARepository userJPARepository;

    @Override
    public User findByID(String username) {
        return null;
    }

    @Override
    // todo: Implementar no JPA Repository usando o JPQL
    public UUID getUUIDByCPF(String cpf) {
        return null;
    }

    @Override
    // todo: Implementar no JPA Repository usando o JPQL
    public boolean existByCFP() {
        return false;
    }

    @Override
    public void save(User user) {

    }
}
