package com.marckvsv.reclame_ali_backend.administration.infrastructure.repository;

import com.marckvsv.reclame_ali_backend.administration.infrastructure.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserJPARepository extends JpaRepository<User, UUID> {
}
