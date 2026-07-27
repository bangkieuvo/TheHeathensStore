package com.example.TheHeathensStore.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;


@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String JWT_SECRET;
    @Value("${jwt.expiration}")
    private Long JWT_EXPIRATION_TIME;

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username) {
        return Jwts.builder()
                   .setSubject(username)
                   .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                   .setIssuedAt(new Date())
                   .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                   .compact();
    }

    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(getSigningKey())
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    public String extractUsername(String token) {
        return getAllClaims(token).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = getAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
