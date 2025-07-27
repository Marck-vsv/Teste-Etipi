package com.marckvsv.reclame_ali_backend.administration.security.configuration.userDetails;

import com.marckvsv.reclame_ali_backend.administration.application.IUserRepository;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByID(username);

        return new CustomUserDetails(user);
    }
}
