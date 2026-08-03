package com.example.TheHeathensStore.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class StoreAuthoritiesTest {
    @Test
    void staffCanManageStoreButCannotManageStaffAccounts() {
        Set<String> authorities = StoreAuthorities.fromRoles(Set.of("STAFF")).stream()
                .map(GrantedAuthority::getAuthority)
                .collect(java.util.stream.Collectors.toSet());

        assertThat(authorities)
                .contains("ROLE_STAFF", StoreAuthorities.ACCESS_MANAGEMENT,
                        StoreAuthorities.MANAGE_PRODUCTS, StoreAuthorities.MANAGE_ORDERS,
                        StoreAuthorities.MANAGE_USERS)
                .doesNotContain(StoreAuthorities.MANAGE_STAFF);
    }

    @Test
    void administratorCanManageStaffAccounts() {
        assertThat(StoreAuthorities.fromRoles(Set.of("ADMIN")))
                .extracting(GrantedAuthority::getAuthority)
                .contains(StoreAuthorities.ACCESS_MANAGEMENT, StoreAuthorities.MANAGE_STAFF);
    }
}
