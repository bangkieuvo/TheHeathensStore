package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.entity.User;
import com.example.TheHeathensStore.repository.AdminRepository;
import com.example.TheHeathensStore.repository.StaffRepository;
import com.example.TheHeathensStore.repository.UserRepository;
import com.example.TheHeathensStore.utility.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorizationService {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final StaffRepository staffRepository;
    private final AdminRepository adminRepository;

    public boolean checkStaff(String token) {
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username)
                                  .orElse(null);
        if (user == null) {
            return false;
        }
        return staffRepository.existsByUserId(user.getId());
    }

    public boolean checkAdmin(String token) {
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username)
                                  .orElse(null);
        if (user == null) {
            return false;
        }
        return adminRepository.existsByUserId(user.getId());
    }
}
