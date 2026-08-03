package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.request.AdminOrderUpdateRequest;
import com.example.TheHeathensStore.dto.request.AdminProductRequest;
import com.example.TheHeathensStore.dto.request.StoreSettingRequest;
import com.example.TheHeathensStore.dto.request.AdminRecordRequest;
import com.example.TheHeathensStore.dto.request.AdminStaffRequest;
import com.example.TheHeathensStore.entity.Staff;
import com.example.TheHeathensStore.entity.Order;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.entity.ProductImage;
import com.example.TheHeathensStore.entity.Season;
import com.example.TheHeathensStore.entity.Team;
import com.example.TheHeathensStore.entity.User;
import com.example.TheHeathensStore.entity.UserInfo;
import com.example.TheHeathensStore.entity.StoreSetting;
import com.example.TheHeathensStore.entity.AdminRecord;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.exception.ResourceNotFoundException;
import com.example.TheHeathensStore.repository.LeagueRepository;
import com.example.TheHeathensStore.repository.OrderRepository;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import com.example.TheHeathensStore.repository.SeasonRepository;
import com.example.TheHeathensStore.repository.TeamRepository;
import com.example.TheHeathensStore.repository.UserInfoRepository;
import com.example.TheHeathensStore.repository.UserRepository;
import com.example.TheHeathensStore.repository.StoreSettingRepository;
import com.example.TheHeathensStore.repository.AdminRecordRepository;
import com.example.TheHeathensStore.repository.AdminRepository;
import com.example.TheHeathensStore.repository.StaffRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private static final long LOW_STOCK_THRESHOLD = 5L;

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final TeamRepository teamRepository;
    private final SeasonRepository seasonRepository;
    private final LeagueRepository leagueRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final StoreSettingRepository storeSettingRepository;
    private final AdminRecordRepository adminRecordRepository;
    private final AdminRepository adminRepository;
    private final StaffRepository staffRepository;

    public Map<String, Object> getDashboard() {
        List<Product> products = productRepository.findAll();
        List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();
        List<User> users = userRepository.findAll();
        BigDecimal revenue = orders.stream()
                .filter(order -> order.getOrderStatus() == Order.OrderStatus.DELIVERED)
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        long pendingOrders = orders.stream().filter(order -> order.getOrderStatus() == Order.OrderStatus.PENDING).count();
        long lowStock = products.stream().filter(product -> product.isActive() && product.getStock() <= LOW_STOCK_THRESHOLD).count();

        Map<String, BigDecimal> revenueByMonth = new LinkedHashMap<>();
        orders.stream()
                .filter(order -> order.getOrderStatus() == Order.OrderStatus.DELIVERED && order.getCreatedAt() != null)
                .sorted(Comparator.comparing(Order::getCreatedAt))
                .forEach(order -> revenueByMonth.merge(YearMonth.from(order.getCreatedAt()).toString(), order.getTotalAmount(), BigDecimal::add));

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("revenue", revenue);
        result.put("orders", orders.size());
        result.put("pendingOrders", pendingOrders);
        result.put("customers", users.stream().filter(user -> !isManagementAccount(user.getId())).count());
        result.put("products", products.size());
        result.put("lowStockProducts", lowStock);
        result.put("revenueByMonth", revenueByMonth);
        result.put("topProducts", products.stream()
                .sorted(Comparator.comparing(Product::getSalesCount, Comparator.nullsFirst(Long::compareTo)).reversed())
                .limit(5)
                .map(this::productRow)
                .toList());
        return result;
    }

    public List<Map<String, Object>> getProducts() {
        return productRepository.findAll().stream()
                .sorted(Comparator.comparing(Product::getCreatedAt, Comparator.nullsLast(LocalDateTime::compareTo)).reversed())
                .map(this::productRow)
                .toList();
    }

    @Transactional
    public Map<String, Object> createProduct(AdminProductRequest request) {
        Product product = new Product();
        product.setSalesCount(0L);
        applyProduct(product, request);
        return productRow(productRepository.saveAndFlush(product));
    }

    @Transactional
    public Map<String, Object> updateProduct(UUID uuid, AdminProductRequest request) {
        Product product = findProduct(uuid);
        applyProduct(product, request);
        return productRow(productRepository.saveAndFlush(product));
    }

    @Transactional
    public Map<String, Object> updateStock(UUID uuid, long stock) {
        Product product = findProduct(uuid);
        product.setStock(stock);
        return productRow(productRepository.saveAndFlush(product));
    }

    @Transactional
    public Map<String, Object> archiveProduct(UUID uuid) {
        Product product = findProduct(uuid);
        product.setActive(false);
        return productRow(productRepository.saveAndFlush(product));
    }

    public Map<String, Object> getCatalog() {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("teams", teamRepository.findAll().stream().map(team -> {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("id", team.getId());
            row.put("name", team.getName());
            row.put("type", team.getTeamType().name());
            row.put("leagueId", team.getLeague() == null ? null : team.getLeague().getId());
            row.put("leagueName", team.getLeague() == null ? null : team.getLeague().getName());
            return row;
        }).toList());
        result.put("seasons", seasonRepository.findAll().stream().map(season -> Map.of("id", season.getId(), "name", season.getName())).toList());
        result.put("leagues", leagueRepository.findAll().stream().map(league -> Map.of("id", league.getId(), "name", league.getName())).toList());
        result.put("jerseyTypes", Arrays.stream(Product.JerseyType.values()).map(Enum::name).toList());
        return result;
    }

    public List<Map<String, Object>> getOrders() {
        Map<Long, User> users = userRepository.findAll().stream().collect(Collectors.toMap(User::getId, Function.identity()));
        return orderRepository.findAllByOrderByCreatedAtDesc().stream().map(order -> orderRow(order, users.get(order.getUserId()))).toList();
    }

    @Transactional
    public Map<String, Object> updateOrder(UUID uuid, AdminOrderUpdateRequest request) {
        Order order = orderRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("Order was not found"));
        try {
            if (request.orderStatus() != null && !request.orderStatus().isBlank()) {
                order.setOrderStatus(Order.OrderStatus.valueOf(request.orderStatus().trim().toUpperCase(Locale.ROOT)));
            }
            if (request.paymentStatus() != null && !request.paymentStatus().isBlank()) {
                order.setPaymentStatus(Order.PaymentStatus.valueOf(request.paymentStatus().trim().toUpperCase(Locale.ROOT)));
            }
        } catch (IllegalArgumentException error) {
            throw new InvalidRequestException("Invalid order or payment status");
        }
        order.setInternalNote(request.internalNote() == null ? null : request.internalNote().trim());
        Order saved = orderRepository.saveAndFlush(order);
        return orderRow(saved, userRepository.findById(saved.getUserId()).orElse(null));
    }

    public List<Map<String, Object>> getCustomers() {
        List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();
        Map<Long, List<Order>> ordersByUser = orders.stream().collect(Collectors.groupingBy(Order::getUserId));
        Map<Long, UserInfo> infoByUser = userInfoRepository.findAll().stream().collect(Collectors.toMap(UserInfo::getUserId, Function.identity()));
        return userRepository.findAll().stream()
                .filter(user -> !isManagementAccount(user.getId()))
                .sorted(Comparator.comparing(User::getCreatedAt, Comparator.nullsLast(LocalDateTime::compareTo)).reversed())
                .map(user -> customerRow(user, infoByUser.get(user.getId()), ordersByUser.getOrDefault(user.getId(), List.of())))
                .toList();
    }

    public List<Map<String, Object>> getStaffMembers() {
        Map<Long, User> users = userRepository.findAll().stream()
                .collect(Collectors.toMap(User::getId, Function.identity()));
        Map<Long, UserInfo> infoByUser = userInfoRepository.findAll().stream()
                .collect(Collectors.toMap(UserInfo::getUserId, Function.identity()));
        return staffRepository.findAll().stream()
                .map(staff -> staffRow(staff, users.get(staff.getUserId()), infoByUser.get(staff.getUserId())))
                .filter(row -> row.get("uuid") != null)
                .sorted(Comparator.comparing(row -> String.valueOf(row.get("employeeCode"))))
                .toList();
    }

    @Transactional
    public Map<String, Object> addStaffMember(AdminStaffRequest request) {
        User user = userRepository.findByUuid(request.userUuid())
                .orElseThrow(() -> new ResourceNotFoundException("User was not found"));
        if (adminRepository.existsByUserId(user.getId())) {
            throw new InvalidRequestException("An administrator cannot be managed as a staff account");
        }
        if (staffRepository.existsByUserId(user.getId())) {
            throw new InvalidRequestException("This user is already a staff member");
        }
        String employeeCode = request.employeeCode().trim().toUpperCase(Locale.ROOT);
        if (staffRepository.existsByEmployeeCodeIgnoreCase(employeeCode)) {
            throw new InvalidRequestException("Employee code is already in use");
        }
        user.setIsActive(true);
        userRepository.save(user);
        Staff staff = staffRepository.saveAndFlush(Staff.builder()
                .userId(user.getId())
                .employeeCode(employeeCode)
                .build());
        return staffRow(staff, user, userInfoRepository.findByUserId(user.getId()).orElse(null));
    }

    @Transactional
    public void removeStaffMember(UUID userUuid) {
        User user = userRepository.findByUuid(userUuid)
                .orElseThrow(() -> new ResourceNotFoundException("Staff account was not found"));
        if (adminRepository.existsByUserId(user.getId())) {
            throw new InvalidRequestException("Administrator accounts cannot be removed through the staff API");
        }
        Staff staff = staffRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff account was not found"));
        staffRepository.delete(staff);
        user.setIsActive(false);
        userRepository.save(user);
    }

    @Transactional
    public Map<String, Object> updateCustomerStatus(UUID uuid, boolean active) {
        User user = userRepository.findByUuid(uuid).orElseThrow(() -> new ResourceNotFoundException("Customer was not found"));
        if (isManagementAccount(user.getId())) {
            throw new InvalidRequestException("Management accounts cannot be changed through the customer API");
        }
        user.setIsActive(active);
        userRepository.saveAndFlush(user);
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return customerRow(user, userInfoRepository.findByUserId(user.getId()).orElse(null), orders);
    }

    public String exportProductsCsv() {
        StringBuilder csv = new StringBuilder("uuid,name,price,stock,salesCount,jerseyType,team,season,active\n");
        for (Product product : productRepository.findAll()) {
            csv.append(product.getUuid()).append(',')
                    .append(csvValue(product.getName())).append(',')
                    .append(product.getPrice()).append(',')
                    .append(product.getStock()).append(',')
                    .append(product.getSalesCount()).append(',')
                    .append(product.getJerseyType()).append(',')
                    .append(csvValue(product.getTeam() == null ? "" : product.getTeam().getName())).append(',')
                    .append(csvValue(product.getSeason() == null ? "" : product.getSeason().getName())).append(',')
                    .append(product.isActive()).append('\n');
        }
        return csv.toString();
    }

    public List<Map<String, Object>> getSettings() {
        return storeSettingRepository.findAll().stream()
                .sorted(Comparator.comparing(StoreSetting::getSettingKey))
                .map(this::settingRow)
                .toList();
    }

    @Transactional
    public Map<String, Object> saveSetting(StoreSettingRequest request) {
        String key = request.key().trim().toLowerCase(Locale.ROOT);
        if (key.startsWith("shipping.")) {
            try {
                if (new BigDecimal(request.value().trim()).signum() < 0) throw new NumberFormatException();
            } catch (NumberFormatException error) {
                throw new InvalidRequestException("Shipping settings must be non-negative numbers");
            }
        }
        StoreSetting setting = storeSettingRepository.findBySettingKey(key).orElseGet(StoreSetting::new);
        setting.setSettingKey(key);
        setting.setSettingValue(request.value().trim());
        setting.setDescription(request.description() == null ? "" : request.description().trim());
        return settingRow(storeSettingRepository.saveAndFlush(setting));
    }

    @Transactional
    public void deleteSetting(String key) {
        StoreSetting setting = storeSettingRepository.findBySettingKey(key.trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new ResourceNotFoundException("Setting was not found"));
        storeSettingRepository.delete(setting);
    }

    public List<Map<String, Object>> getRecords() {
        return adminRecordRepository.findAllByOrderByUpdatedAtDesc().stream().map(this::recordRow).toList();
    }

    @Transactional
    public Map<String, Object> saveRecord(UUID uuid, AdminRecordRequest request) {
        AdminRecord record = uuid == null ? new AdminRecord() : adminRecordRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("Management record was not found"));
        try { record.setRecordType(AdminRecord.RecordType.valueOf(request.type().trim().toUpperCase(Locale.ROOT))); }
        catch (IllegalArgumentException error) { throw new InvalidRequestException("Invalid management record type"); }
        if (request.startsAt() != null && request.endsAt() != null && request.endsAt().isBefore(request.startsAt())) {
            throw new InvalidRequestException("End time must be after start time");
        }
        record.setRecordKey(request.key().trim());
        record.setTitle(request.title().trim());
        record.setContent(request.content() == null ? "" : request.content().trim());
        record.setRecordValue(request.value() == null ? "" : request.value().trim());
        record.setActive(request.active());
        record.setStartsAt(request.startsAt());
        record.setEndsAt(request.endsAt());
        return recordRow(adminRecordRepository.saveAndFlush(record));
    }

    @Transactional
    public void deleteRecord(UUID uuid) {
        adminRecordRepository.delete(adminRecordRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("Management record was not found")));
    }

    private void applyProduct(Product product, AdminProductRequest request) {
        Product.JerseyType jerseyType;
        try {
            jerseyType = Product.JerseyType.valueOf(request.jerseyType().trim().toLowerCase(Locale.ROOT));
        } catch (IllegalArgumentException error) {
            throw new InvalidRequestException("Invalid jersey type");
        }
        Team team = request.teamId() == null ? null : teamRepository.findById(request.teamId())
                .orElseThrow(() -> new ResourceNotFoundException("Team was not found"));
        Season season = request.seasonId() == null ? null : seasonRepository.findById(request.seasonId())
                .orElseThrow(() -> new ResourceNotFoundException("Season was not found"));
        product.setName(request.name().trim());
        product.setPrice(request.price());
        product.setStock(request.stock());
        product.setDescription(request.description() == null ? "" : request.description().trim());
        product.setJerseyType(jerseyType);
        product.setTeam(team);
        product.setSeason(season);
        product.setActive(request.active());
    }

    private Product findProduct(UUID uuid) {
        return productRepository.findByUuid(uuid).orElseThrow(() -> new ResourceNotFoundException("Product was not found"));
    }

    private Map<String, Object> productRow(Product product) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("uuid", product.getUuid());
        row.put("name", product.getName());
        row.put("price", product.getPrice());
        row.put("stock", product.getStock());
        row.put("salesCount", product.getSalesCount());
        row.put("description", product.getDescription());
        row.put("jerseyType", product.getJerseyType().name());
        row.put("teamId", product.getTeam() == null ? null : product.getTeam().getId());
        row.put("teamName", product.getTeam() == null ? null : product.getTeam().getName());
        row.put("leagueName", product.getTeam() == null || product.getTeam().getLeague() == null ? null : product.getTeam().getLeague().getName());
        row.put("seasonId", product.getSeason() == null ? null : product.getSeason().getId());
        row.put("season", product.getSeason() == null ? null : product.getSeason().getName());
        row.put("active", product.isActive());
        row.put("createdAt", product.getCreatedAt());
        row.put("updatedAt", product.getUpdatedAt());
        row.put("thumbnailUrl", productImageRepository.findByProductIdAndIsThumbnailTrue(product.getId()).map(ProductImage::getImageUrl).orElse(null));
        return row;
    }

    private Map<String, Object> orderRow(Order order, User user) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("uuid", order.getUuid());
        row.put("customerUsername", user == null ? null : user.getUsername());
        row.put("customerEmail", user == null ? null : user.getEmail());
        row.put("orderStatus", order.getOrderStatus().name());
        row.put("paymentStatus", order.getPaymentStatus().name());
        row.put("shippingMethod", order.getShippingMethod().name());
        row.put("paymentMethod", order.getPaymentMethod().name());
        row.put("totalAmount", order.getTotalAmount());
        row.put("shippingFee", order.getShippingFee());
        row.put("recipientName", order.getRecipientName());
        row.put("recipientPhone", order.getRecipientPhone());
        row.put("shippingAddress", order.getShippingAddress());
        row.put("internalNote", order.getInternalNote());
        row.put("createdAt", order.getCreatedAt());
        row.put("updatedAt", order.getUpdatedAt());
        row.put("items", order.getItems().stream().map(item -> {
            Map<String, Object> value = new LinkedHashMap<>();
            value.put("productUuid", item.getProductUuid());
            value.put("productName", item.getProductName());
            value.put("quantity", item.getQuantity());
            value.put("unitPrice", item.getUnitPrice());
            value.put("lineTotal", item.getLineTotal());
            return value;
        }).toList());
        return row;
    }

    private Map<String, Object> customerRow(User user, UserInfo info, List<Order> orders) {
        BigDecimal totalSpent = orders.stream()
                .filter(order -> order.getOrderStatus() != Order.OrderStatus.CANCELLED)
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("uuid", user.getUuid());
        row.put("username", user.getUsername());
        row.put("email", user.getEmail());
        row.put("fullName", info == null ? null : info.getFullName());
        row.put("phone", info == null ? null : info.getPhone());
        row.put("active", user.getIsActive());
        row.put("orderCount", orders.size());
        row.put("totalSpent", totalSpent);
        row.put("createdAt", user.getCreatedAt());
        return row;
    }

    private Map<String, Object> staffRow(Staff staff, User user, UserInfo info) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("uuid", user == null ? null : user.getUuid());
        row.put("employeeCode", staff.getEmployeeCode());
        row.put("username", user == null ? null : user.getUsername());
        row.put("email", user == null ? null : user.getEmail());
        row.put("fullName", info == null ? null : info.getFullName());
        row.put("active", user != null && Boolean.TRUE.equals(user.getIsActive()));
        row.put("isAdmin", user != null && adminRepository.existsByUserId(user.getId()));
        return row;
    }

    private boolean isManagementAccount(Long userId) {
        return adminRepository.existsByUserId(userId) || staffRepository.existsByUserId(userId);
    }

    private String csvValue(String value) {
        return '"' + value.replace("\"", "\"\"") + '"';
    }

    private Map<String, Object> settingRow(StoreSetting setting) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("key", setting.getSettingKey());
        row.put("value", setting.getSettingValue());
        row.put("description", setting.getDescription());
        row.put("updatedAt", setting.getUpdatedAt());
        return row;
    }

    private Map<String, Object> recordRow(AdminRecord record) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("uuid", record.getUuid()); row.put("type", record.getRecordType().name());
        row.put("key", record.getRecordKey()); row.put("title", record.getTitle());
        row.put("content", record.getContent()); row.put("value", record.getRecordValue());
        row.put("active", record.isActive()); row.put("startsAt", record.getStartsAt()); row.put("endsAt", record.getEndsAt());
        row.put("updatedAt", record.getUpdatedAt()); return row;
    }
}
