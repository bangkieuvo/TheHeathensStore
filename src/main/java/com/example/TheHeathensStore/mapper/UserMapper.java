package com.example.TheHeathensStore.mapper;

import com.example.TheHeathensStore.dto.request.UserRegisterRequest;
import com.example.TheHeathensStore.dto.response.UserResponse;
import com.example.TheHeathensStore.entity.User;
import com.example.TheHeathensStore.entity.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    public UserResponse entityToResponse(User user, UserInfo userInfo) {
        if (user == null)
            return null;
        if (userInfo == null)
            return UserResponse.builder()
                               .uuid(user.getUuid())
                               .email(user.getEmail())
                               .build();
        return UserResponse.builder()
                           .uuid(user.getUuid())
                           .fullName(userInfo.getFullName())
                           .address(userInfo.getAddress())
                           .email(user.getEmail())
                           .build();
    }

    public User registerToEntity(UserRegisterRequest userRegisterRequest) {
        if (userRegisterRequest == null)
            return null;
        return User.builder()
                   .username(userRegisterRequest.getUsername())
                   .passwordHash(userRegisterRequest.getPassword())
                   .email(userRegisterRequest.getEmail())
                   .build();
    }
}
