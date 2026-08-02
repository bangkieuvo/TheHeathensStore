package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.request.UserLoginRequest;
import com.example.TheHeathensStore.dto.request.UserRegisterRequest;
import com.example.TheHeathensStore.dto.request.ChangePasswordRequest;
import com.example.TheHeathensStore.dto.request.ShippingAddressRequest;
import com.example.TheHeathensStore.dto.request.UpdateProfileRequest;
import com.example.TheHeathensStore.dto.response.ShippingAddressResponse;
import com.example.TheHeathensStore.dto.response.UserResponse;
import com.example.TheHeathensStore.entity.User;
import com.example.TheHeathensStore.entity.UserInfo;
import com.example.TheHeathensStore.entity.ShippingAddress;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.mapper.UserMapper;
import com.example.TheHeathensStore.repository.UserInfoRepository;
import com.example.TheHeathensStore.repository.UserRepository;
import com.example.TheHeathensStore.repository.ShippingAddressRepository;
import com.example.TheHeathensStore.exception.ResourceNotFoundException;
import com.example.TheHeathensStore.utility.BCryptHasher;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserInfoRepository userInfoRepository;
    private final BCryptHasher bCryptHasher;
    private final ShippingAddressRepository shippingAddressRepository;

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
        String username = userRegisterRequest.getUsername().trim();
        String email = userRegisterRequest.getEmail().trim().toLowerCase(Locale.ROOT);
        if (userRepository.existsByUsernameOrEmail(username, email))
            throw new InvalidRequestException("Username or email already exists");
        User user = User.builder()
                        .username(username)
                        .email(email)
                        .passwordHash(bCryptHasher.hash(userRegisterRequest.getPassword()))
                        .build();
        userRepository.save(user);
        UserInfo userInfo = UserInfo.builder()
                                    .userId(user.getId())
                                    .fullName(userRegisterRequest.getFullName().trim())
                                    .phone(normalizeNullable(userRegisterRequest.getPhone()))
                                    .address(userRegisterRequest.getAddress() == null ? "" : userRegisterRequest.getAddress().trim())
                                    .build();
        userInfoRepository.save(userInfo);
        return userMapper.entityToResponse(user, userInfo);
    }

    @Transactional
    public UserResponse updateProfile(Long userId, UpdateProfileRequest request) {
        User user = findUser(userId);
        if (userRepository.existsByEmailAndIdNot(request.email().trim(), userId)) {
            throw new InvalidRequestException("Email already exists");
        }
        UserInfo userInfo = userInfoRepository.findByUserId(userId)
                                              .orElseGet(() -> UserInfo.builder().userId(userId).build());
        user.setEmail(request.email().trim().toLowerCase(Locale.ROOT));
        userInfo.setFullName(request.fullName().trim());
        userInfo.setPhone(normalizeNullable(request.phone()));
        userInfo.setAddress(request.address() == null ? "" : request.address().trim());
        userInfoRepository.save(userInfo);
        return userMapper.entityToResponse(user, userInfo);
    }

    @Transactional
    public void changePassword(Long userId, ChangePasswordRequest request) {
        User user = findUser(userId);
        if (!bCryptHasher.isMatch(request.currentPassword(), user.getPasswordHash())) {
            throw new InvalidRequestException("Current password is incorrect");
        }
        if (bCryptHasher.isMatch(request.newPassword(), user.getPasswordHash())) {
            throw new InvalidRequestException("New password must be different from the current password");
        }
        user.setPasswordHash(bCryptHasher.hash(request.newPassword()));
    }

    public List<ShippingAddressResponse> getShippingAddresses(Long userId) {
        return shippingAddressRepository.findByUserIdOrderByIsDefaultDescIdAsc(userId)
                                        .stream()
                                        .map(this::toAddressResponse)
                                        .toList();
    }

    @Transactional
    public ShippingAddressResponse createShippingAddress(Long userId, ShippingAddressRequest request) {
        List<ShippingAddress> existingAddresses = shippingAddressRepository.findByUserIdOrderByIsDefaultDescIdAsc(userId);
        boolean makeDefault = request.isDefault() || existingAddresses.isEmpty();
        if (makeDefault) {
            existingAddresses.forEach(address -> address.setDefault(false));
        }
        ShippingAddress address = ShippingAddress.builder()
                                                 .userId(userId)
                                                 .recipientName(request.recipientName().trim())
                                                 .recipientPhone(request.recipientPhone().trim())
                                                 .address(request.address().trim())
                                                 .isDefault(makeDefault)
                                                 .build();
        return toAddressResponse(shippingAddressRepository.save(address));
    }

    @Transactional
    public ShippingAddressResponse updateShippingAddress(Long userId, Long addressId, ShippingAddressRequest request) {
        ShippingAddress address = findAddress(userId, addressId);
        if (request.isDefault()) {
            shippingAddressRepository.findByUserIdOrderByIsDefaultDescIdAsc(userId)
                                     .forEach(item -> item.setDefault(item.getId().equals(addressId)));
        }
        address.setRecipientName(request.recipientName().trim());
        address.setRecipientPhone(request.recipientPhone().trim());
        address.setAddress(request.address().trim());
        address.setDefault(request.isDefault() || address.isDefault());
        return toAddressResponse(shippingAddressRepository.save(address));
    }

    @Transactional
    public void deleteShippingAddress(Long userId, Long addressId) {
        ShippingAddress address = findAddress(userId, addressId);
        boolean wasDefault = address.isDefault();
        shippingAddressRepository.delete(address);
        if (wasDefault) {
            shippingAddressRepository.findByUserIdOrderByIsDefaultDescIdAsc(userId)
                                     .stream()
                                     .findFirst()
                                     .ifPresent(item -> item.setDefault(true));
        }
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                             .orElseThrow(() -> new ResourceNotFoundException("User was not found"));
    }

    private ShippingAddress findAddress(Long userId, Long addressId) {
        return shippingAddressRepository.findByIdAndUserId(addressId, userId)
                                        .orElseThrow(() -> new ResourceNotFoundException("Shipping address was not found"));
    }

    private ShippingAddressResponse toAddressResponse(ShippingAddress address) {
        return ShippingAddressResponse.builder()
                                      .id(address.getId())
                                      .recipientName(address.getRecipientName())
                                      .recipientPhone(address.getRecipientPhone())
                                      .address(address.getAddress())
                                      .isDefault(address.isDefault())
                                      .build();
    }

    private String normalizeNullable(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }


}
