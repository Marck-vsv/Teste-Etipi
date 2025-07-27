package com.marckvsv.reclame_ali_backend.sharedKernel.application;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.marckvsv.reclame_ali_backend.administration.security.configuration.jwt.IJWTUtils;
import com.marckvsv.reclame_ali_backend.administration.security.configuration.userDetails.CustomUserDetails;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
@Getter
@Setter
@NoArgsConstructor
public class JWTUtils implements IJWTUtils {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private Long expiration;

    @Override
    public String generateToken(UserDetails customUserDetails) {
        List<String> roles = customUserDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return JWT.create()
                .withSubject(customUserDetails.getUsername())
                .withClaim("userInfo", Map.of("name", ((CustomUserDetails) customUserDetails).getName()))
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expiration))
                .sign(Algorithm.HMAC512(secret));
    }

    @Override
    public Boolean validateToken(String jwt, UserDetails userDetails) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC512(secret)).build();
            DecodedJWT decodedJWT = verifier.verify(jwt);

            final String username = decodedJWT.getSubject();

            return (username.equals(userDetails.getUsername()));
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    @Override
    public String extractUsername(String jwt) {
        DecodedJWT jwtDecoded = JWT.decode(jwt);
        return jwtDecoded.getSubject();
    }

    @Override
    public Boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }

    @Override
    public Date extractExpiration(String jwt) {
        DecodedJWT jwtDecoded = JWT.decode(jwt);
        return jwtDecoded.getExpiresAt();
    }
}
