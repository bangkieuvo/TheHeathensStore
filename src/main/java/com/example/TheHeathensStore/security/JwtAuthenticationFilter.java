package com.example.TheHeathensStore.security;

import com.example.TheHeathensStore.service.AuthenticationService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final AuthenticationService authenticationService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Value("${API_URL}")
    private String apiUrl;

    private String getToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        for (Cookie cookie : cookies) {
            if ("loginToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getToken(request);
            if (token == null) {
                log.info("Token Not Found, continue as anonymous");
                filterChain.doFilter(request, response);
                return;
            }
            UserPrincipal userPrincipal = authenticationService.authenticate(token);
            if (userPrincipal == null) {
                log.error("Invalid token");
                throw new AuthenticationException("Invalid Token") {
                };
            }
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userPrincipal,
                            null,
                            userPrincipal.getAuthorities()
                    );
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext()
                                 .setAuthentication(authentication);
            log.info("Authentication success for user: {}", userPrincipal.getUsername());
            filterChain.doFilter(request, response);
            return;
        } catch (Exception e) {
            log.error("Authentication Failure", e);
            jwtAuthenticationEntryPoint.commence(request, response, new AuthenticationException("Authenticate fail", e) {
            });
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.equals(apiUrl + "/public") || path.startsWith(apiUrl + "/public/");
    }
}
