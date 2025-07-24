package com.marckvsv.reclame_ali_backend.infra.repository;

import com.marckvsv.reclame_ali_backend.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
