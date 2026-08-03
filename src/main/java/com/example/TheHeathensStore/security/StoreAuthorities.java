package com.example.TheHeathensStore.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.LinkedHashSet;
import java.util.Set;

public final class StoreAuthorities {
    public static final String ACCESS_MANAGEMENT = "ACCESS_MANAGEMENT";
    public static final String MANAGE_PRODUCTS = "MANAGE_PRODUCTS";
    public static final String MANAGE_ORDERS = "MANAGE_ORDERS";
    public static final String MANAGE_USERS = "MANAGE_USERS";
    public static final String MANAGE_CONTENT = "MANAGE_CONTENT";
    public static final String MANAGE_SETTINGS = "MANAGE_SETTINGS";
    public static final String MANAGE_STAFF = "MANAGE_STAFF";

    private static final Set<String> MANAGEMENT_AUTHORITIES = Set.of(
            ACCESS_MANAGEMENT,
            MANAGE_PRODUCTS,
            MANAGE_ORDERS,
            MANAGE_USERS,
            MANAGE_CONTENT,
            MANAGE_SETTINGS
    );

    private StoreAuthorities() {
    }

    public static Set<GrantedAuthority> fromRoles(Set<String> roles) {
        Set<GrantedAuthority> authorities = new LinkedHashSet<>();
        roles.forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
        if (roles.contains("ADMIN") || roles.contains("STAFF")) {
            MANAGEMENT_AUTHORITIES.forEach(authority -> authorities.add(new SimpleGrantedAuthority(authority)));
        }
        if (roles.contains("ADMIN")) {
            authorities.add(new SimpleGrantedAuthority(MANAGE_STAFF));
        }
        return authorities;
    }
}
