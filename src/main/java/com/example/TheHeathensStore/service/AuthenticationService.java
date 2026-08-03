package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.request.UserLoginRequest;
import com.example.TheHeathensStore.dto.response.UserResponse;
import com.example.TheHeathensStore.entity.User;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.mapper.UserMapper;
import com.example.TheHeathensStore.repository.AdminRepository;
import com.example.TheHeathensStore.repository.StaffRepository;
import com.example.TheHeathensStore.repository.UserInfoRepository;
import com.example.TheHeathensStore.repository.UserRepository;
import com.example.TheHeathensStore.security.UserPrincipal;
import com.example.TheHeathensStore.utility.BCryptHasher;
import com.example.TheHeathensStore.utility.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final BCryptHasher bCryptHasher;
    private final AdminRepository adminRepository;
    private final StaffRepository staffRepository;
    private final UserMapper userMapper;
    private final UserInfoRepository userInfoRepository;

    public UserResponse checkLogin(String token) {
        if (token == null)
            return null;
        if (token.isEmpty())
            return null;
        if (!jwtUtil.validateToken(token))
            return null;
        User user = userRepository.findByUsername(jwtUtil.extractUsername(token)).orElse(null);
        if (user == null || !Boolean.TRUE.equals(user.getIsActive())){
            return null;
        }
        UserResponse response = userMapper.entityToResponse(user, userInfoRepository.findByUserId(user.getId()).orElse(null));
        Set<String> roles = new HashSet<>();
        if (adminRepository.existsByUserId(user.getId())) roles.add("ADMIN");
        if (staffRepository.existsByUserId(user.getId())) roles.add("STAFF");
        if (roles.isEmpty()) roles.add("USER");
        response.setRoles(roles);
        return response;
    }

    public String login(UserLoginRequest userLoginRequest) {
        if (userLoginRequest == null || userLoginRequest.getUsername() == null || userLoginRequest.getPassword() == null)
            throw new InvalidRequestException("Invalid username or password");
        String identifier = userLoginRequest.getUsername().trim();
        User user = userRepository.findByUsername(identifier)
                                  .or(() -> userRepository.findByEmailIgnoreCase(identifier))
                                  .or(() -> userInfoRepository.findByPhone(identifier)
                                                                  .flatMap(info -> userRepository.findById(info.getUserId())))
                                  .orElse(null);
        if (user == null || !Boolean.TRUE.equals(user.getIsActive())) {
            throw new InvalidRequestException("Invalid username or password");
        }
        if (!bCryptHasher.isMatch(userLoginRequest.getPassword(), user.getPasswordHash())) {
            throw new InvalidRequestException("Invalid username or password");
        }
        return jwtUtil.generateToken(user.getUsername(), userLoginRequest.isRememberMe());
    }

    public UserPrincipal authenticate(String token) {
        if (token == null || !jwtUtil.validateToken(token))
            throw new InvalidRequestException("Invalid token");
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username)
                                  .orElse(null);
        if (user == null || !Boolean.TRUE.equals(user.getIsActive())) {
            throw new InvalidRequestException("Invalid username or password");
        }
        Set<String> roles = new HashSet<>();
        if (adminRepository.existsByUserId(user.getId())) {
            roles.add("ADMIN");
        }
        if (staffRepository.existsByUserId(user.getId())) {
            roles.add("STAFF");
        }
        if (roles.isEmpty()) {
            roles.add("USER");
        }
        return UserPrincipal.builder()
                            .userId(user.getId())
                            .uuid(user.getUuid())
                            .username(user.getUsername())
                            .password(null)
                            .roles(roles)
                            .build();
    }
}
