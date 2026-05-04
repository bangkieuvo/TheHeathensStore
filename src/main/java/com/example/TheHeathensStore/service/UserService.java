package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.request.UserLoginRequest;
import com.example.TheHeathensStore.dto.request.UserRegisterRequest;
import com.example.TheHeathensStore.dto.response.UserResponse;
import com.example.TheHeathensStore.entity.User;
import com.example.TheHeathensStore.entity.UserInfo;
import com.example.TheHeathensStore.mapper.UserMapper;
import com.example.TheHeathensStore.repository.UserInfoRepository;
import com.example.TheHeathensStore.repository.UserRepository;
import com.example.TheHeathensStore.utility.BCryptHasher;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserInfoRepository userInfoRepository;
    private final BCryptHasher bCryptHasher;

    public UserResponse getById(Long id) {
        return this.userRepository.findById(id)
                                  .map(user -> userMapper.entityToResponse(user, userInfoRepository.findByUserId(user.getId())
                                                                                                   .orElse(null)))
                                  .orElse(null);
    }

    public UserResponse getByUuid(UUID uuid) {
        return this.userRepository.findByUuid(uuid)
                                  .map(user -> userMapper.entityToResponse(user, userInfoRepository.findByUserId(user.getId())
                                                                                                   .orElse(null)))
                                  .orElse(null);
    }

    @Transactional
    public UserResponse register(UserRegisterRequest userRegisterRequest) {
        if (userRepository.existsByUsernameOrEmail(userRegisterRequest.getUsername(), userRegisterRequest.getEmail()))
            return null;
        User user = User.builder()
                        .username(userRegisterRequest.getUsername())
                        .email(userRegisterRequest.getEmail())
                        .passwordHash(bCryptHasher.hash(userRegisterRequest.getPassword()))
                        .build();
        userRepository.save(user);
        UserInfo userInfo = UserInfo.builder()
                                    .userId(user.getId())
                                    .fullName(userRegisterRequest.getFullname())
                                    .address(userRegisterRequest.getAddress())
                                    .build();
        userInfoRepository.save(userInfo);
        return userMapper.entityToResponse(user, userInfo);
    }

    public UserResponse login(UserLoginRequest userLoginRequest) {
        User user = userRepository.findByUsername(userLoginRequest.getUsername())
                                  .orElse(null);
        if (user == null)
            return null;
        if (!bCryptHasher.isMatch(userLoginRequest.getPassword(), user.getPasswordHash()))
            return null;
        return userMapper.entityToResponse(user, userInfoRepository.findByUserId(user.getId())
                                                                   .orElse(null));

    }
}
