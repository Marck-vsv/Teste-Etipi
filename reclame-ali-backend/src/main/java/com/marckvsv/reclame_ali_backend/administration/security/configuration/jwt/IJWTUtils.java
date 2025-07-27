package com.marckvsv.reclame_ali_backend.administration.security.configuration.jwt;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

public interface IJWTUtils {
    String generateToken(UserDetails customUserDetails);

    Boolean validateToken(String jwt, UserDetails customUserDetails);

    String extractUsername(String jwt);

//    String extractRoles(String jwt);

    Boolean isTokenExpired(String jwt);

    Date extractExpiration(String jwt);
}
