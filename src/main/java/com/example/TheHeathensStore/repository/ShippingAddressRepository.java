package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.ShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Long> {
    List<ShippingAddress> findByUserIdOrderByIsDefaultDescIdAsc(Long userId);
    Optional<ShippingAddress> findByIdAndUserId(Long id, Long userId);
}
