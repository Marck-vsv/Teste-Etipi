package com.marckvsv.reclame_ali_backend.administration.application;

import com.marckvsv.reclame_ali_backend.administration.api.IUserApplication;
import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAccountCommand;
import com.marckvsv.reclame_ali_backend.administration.api.command.CreateAuthenticationTokenCommand;
import com.marckvsv.reclame_ali_backend.administration.infrastructure.models.User;
import com.marckvsv.reclame_ali_backend.administration.security.configuration.jwt.IJWTUtils;
import com.marckvsv.reclame_ali_backend.administration.security.configuration.userDetails.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdministrarionApplicationClient implements IUserApplication {

    private final IUserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;
    private final IJWTUtils jwtUtils;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final PasswordEncoder passwordEncoder;

    //Todo: Verificar melhor as relações entre as camadas
    @Override
    public String createAuthenticationToken(CreateAuthenticationTokenCommand command) {
        String userID = userRepository.getUUIDByCPF(command.getLoginRequest().getCpf()).toString();

        //todo: verificar se catch nao vira handler global
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userID, command.getLoginRequest().getPassword()));

        } catch (BadCredentialsException e) {

        } catch (Exception e) {

        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(userID);

        //todo: colocar em um dto em vez de retornar string direto
        return jwtUtils.generateToken(userDetails);
    }

    @Override
    public Void createAccount(CreateAccountCommand command) {
        //Todo: Isso deve ser feito na camada de infra
        if (userRepository.existByCFP()) {
            throw new BadCredentialsException("User already exists");
        }
        String encodedPassword = passwordEncoder.encode(command.getCreateAccountRequest().getPassword());

        User user = new User();
        user.setName(command.getCreateAccountRequest().getName());
        user.setCpf(command.getCreateAccountRequest().getCpf());
        user.setPassword(encodedPassword);

        userRepository.save(user);

        return null;
    }
}
