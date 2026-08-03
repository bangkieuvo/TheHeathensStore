package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.entity.Staff;
import com.example.TheHeathensStore.entity.User;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.repository.AdminRecordRepository;
import com.example.TheHeathensStore.repository.AdminRepository;
import com.example.TheHeathensStore.repository.LeagueRepository;
import com.example.TheHeathensStore.repository.OrderRepository;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import com.example.TheHeathensStore.repository.SeasonRepository;
import com.example.TheHeathensStore.repository.StaffRepository;
import com.example.TheHeathensStore.repository.StoreSettingRepository;
import com.example.TheHeathensStore.repository.TeamRepository;
import com.example.TheHeathensStore.repository.UserInfoRepository;
import com.example.TheHeathensStore.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminServiceAuthorizationTest {
    @Mock ProductRepository productRepository;
    @Mock ProductImageRepository productImageRepository;
    @Mock TeamRepository teamRepository;
    @Mock SeasonRepository seasonRepository;
    @Mock LeagueRepository leagueRepository;
    @Mock OrderRepository orderRepository;
    @Mock UserRepository userRepository;
    @Mock UserInfoRepository userInfoRepository;
    @Mock StoreSettingRepository storeSettingRepository;
    @Mock AdminRecordRepository adminRecordRepository;
    @Mock AdminRepository adminRepository;
    @Mock StaffRepository staffRepository;
    @InjectMocks AdminService adminService;

    @Test
    void staffRemovalApiCannotRemoveAnAdministrator() {
        UUID uuid = UUID.randomUUID();
        User admin = User.builder().id(1L).uuid(uuid).isActive(true).build();
        when(userRepository.findByUuid(uuid)).thenReturn(Optional.of(admin));
        when(adminRepository.existsByUserId(1L)).thenReturn(true);

        assertThatThrownBy(() -> adminService.removeStaffMember(uuid))
                .isInstanceOf(InvalidRequestException.class)
                .hasMessageContaining("Administrator");

        verify(staffRepository, never()).delete(org.mockito.ArgumentMatchers.any());
        verify(userRepository, never()).save(org.mockito.ArgumentMatchers.any());
    }

    @Test
    void removingStaffRevokesRoleAndDeactivatesAccount() {
        UUID uuid = UUID.randomUUID();
        User user = User.builder().id(2L).uuid(uuid).isActive(true).build();
        Staff staff = Staff.builder().id(10L).userId(2L).employeeCode("S-0002").build();
        when(userRepository.findByUuid(uuid)).thenReturn(Optional.of(user));
        when(adminRepository.existsByUserId(2L)).thenReturn(false);
        when(staffRepository.findByUserId(2L)).thenReturn(Optional.of(staff));

        adminService.removeStaffMember(uuid);

        verify(staffRepository).delete(staff);
        verify(userRepository).save(user);
        org.assertj.core.api.Assertions.assertThat(user.getIsActive()).isFalse();
    }
}
