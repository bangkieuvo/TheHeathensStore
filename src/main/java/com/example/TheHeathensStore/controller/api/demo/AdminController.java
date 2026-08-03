package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.request.AdminCustomerStatusRequest;
import com.example.TheHeathensStore.dto.request.AdminOrderUpdateRequest;
import com.example.TheHeathensStore.dto.request.AdminProductRequest;
import com.example.TheHeathensStore.dto.request.AdminStockRequest;
import com.example.TheHeathensStore.dto.request.StoreSettingRequest;
import com.example.TheHeathensStore.dto.request.AdminRecordRequest;
import com.example.TheHeathensStore.dto.request.AdminStaffRequest;
import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import com.example.TheHeathensStore.service.AdminService;
import com.example.TheHeathensStore.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API_URL}/admin")
public class AdminController {
    private final AdminService adminService;
    private final ProductService productService;

    @GetMapping("/dashboard")
    public ApiResponse<Map<String, Object>> dashboard() {
        return ApiResponse.success(adminService.getDashboard());
    }

    @GetMapping("/catalog")
    public ApiResponse<Map<String, Object>> catalog() {
        return ApiResponse.success(adminService.getCatalog());
    }

    @GetMapping("/products")
    public ApiResponse<List<Map<String, Object>>> products() {
        return ApiResponse.success(adminService.getProducts());
    }

    @PostMapping("/products")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createProduct(@Valid @RequestBody AdminProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.of(201, "Product created", true, adminService.createProduct(request)));
    }

    @PutMapping("/products/{uuid}")
    public ApiResponse<Map<String, Object>> updateProduct(@PathVariable UUID uuid, @Valid @RequestBody AdminProductRequest request) {
        return ApiResponse.success("Product updated", adminService.updateProduct(uuid, request));
    }

    @PatchMapping("/products/{uuid}/stock")
    public ApiResponse<Map<String, Object>> updateStock(@PathVariable UUID uuid, @Valid @RequestBody AdminStockRequest request) {
        return ApiResponse.success("Stock updated", adminService.updateStock(uuid, request.stock()));
    }

    @DeleteMapping("/products/{uuid}")
    public ApiResponse<Map<String, Object>> archiveProduct(@PathVariable UUID uuid) {
        return ApiResponse.success("Product archived", adminService.archiveProduct(uuid));
    }

    @PostMapping(value = "/products/{uuid}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<List<Map<?, ?>>>> uploadProductImages(
            @PathVariable UUID uuid,
            @RequestParam("mainImage") MultipartFile mainImage,
            @RequestParam(value = "subImages", required = false) MultipartFile[] subImages
    ) throws IOException {
        List<Map<?, ?>> images = productService.uploadImage(uuid, mainImage, subImages);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of(201, "Product images uploaded", true, images));
    }

    @GetMapping(value = "/products/export", produces = "text/csv")
    public ResponseEntity<String> exportProducts() {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=products.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(adminService.exportProductsCsv());
    }

    @GetMapping("/orders")
    public ApiResponse<List<Map<String, Object>>> orders() {
        return ApiResponse.success(adminService.getOrders());
    }

    @PatchMapping("/orders/{uuid}")
    public ApiResponse<Map<String, Object>> updateOrder(@PathVariable UUID uuid, @Valid @RequestBody AdminOrderUpdateRequest request) {
        return ApiResponse.success("Order updated", adminService.updateOrder(uuid, request));
    }

    @GetMapping("/customers")
    public ApiResponse<List<Map<String, Object>>> customers() {
        return ApiResponse.success(adminService.getCustomers());
    }

    @PatchMapping("/customers/{uuid}/status")
    public ApiResponse<Map<String, Object>> updateCustomer(@PathVariable UUID uuid, @RequestBody AdminCustomerStatusRequest request) {
        return ApiResponse.success("Customer status updated", adminService.updateCustomerStatus(uuid, request.active()));
    }

    @GetMapping("/settings")
    public ApiResponse<List<Map<String, Object>>> settings() {
        return ApiResponse.success(adminService.getSettings());
    }

    @PutMapping("/settings")
    public ApiResponse<Map<String, Object>> saveSetting(@Valid @RequestBody StoreSettingRequest request) {
        return ApiResponse.success("Setting saved", adminService.saveSetting(request));
    }

    @DeleteMapping("/settings/{key}")
    public ApiResponse<Void> deleteSetting(@PathVariable String key) {
        adminService.deleteSetting(key);
        return ApiResponse.success("Setting deleted", null);
    }

    @GetMapping("/records")
    public ApiResponse<List<Map<String, Object>>> records() { return ApiResponse.success(adminService.getRecords()); }

    @PostMapping("/records")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createRecord(@Valid @RequestBody AdminRecordRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.of(201, "Record created", true, adminService.saveRecord(null, request)));
    }

    @PutMapping("/records/{uuid}")
    public ApiResponse<Map<String, Object>> updateRecord(@PathVariable UUID uuid, @Valid @RequestBody AdminRecordRequest request) {
        return ApiResponse.success("Record updated", adminService.saveRecord(uuid, request));
    }

    @DeleteMapping("/records/{uuid}")
    public ApiResponse<Void> deleteRecord(@PathVariable UUID uuid) { adminService.deleteRecord(uuid); return ApiResponse.success("Record deleted", null); }

    @GetMapping("/staff")
    public ApiResponse<List<Map<String, Object>>> staffMembers() {
        return ApiResponse.success(adminService.getStaffMembers());
    }

    @PostMapping("/staff")
    public ResponseEntity<ApiResponse<Map<String, Object>>> addStaffMember(@Valid @RequestBody AdminStaffRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of(201, "Staff member added", true, adminService.addStaffMember(request)));
    }

    @DeleteMapping("/staff/{userUuid}")
    public ApiResponse<Void> removeStaffMember(@PathVariable UUID userUuid) {
        adminService.removeStaffMember(userUuid);
        return ApiResponse.success("Staff account removed and deactivated", null);
    }
}
