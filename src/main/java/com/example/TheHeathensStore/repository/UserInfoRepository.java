package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo,Long> {
    Optional<UserInfo> findByUserId(Long userId);
}
