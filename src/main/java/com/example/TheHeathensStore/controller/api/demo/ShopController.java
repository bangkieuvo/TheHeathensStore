package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import com.example.TheHeathensStore.filter.ProductFilter;
import com.example.TheHeathensStore.service.ProductService;
import com.example.TheHeathensStore.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API_URL}/public/products")
public class ShopController {
    private final ShopService shopService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponse>>> getProducts
            (
                    @RequestParam(value = "page", defaultValue = "1") int pageNumber,
                    @RequestParam(value = "size", defaultValue = "16") int pageSize,
                    @RequestParam(value = "sort", defaultValue = "newest") String sort,
                    @ModelAttribute ProductFilter productFilter
            ) {

        return ResponseEntity.ok(ApiResponse.success(
                shopService.getShopWithFilter(pageNumber - 1, pageSize, productFilter, sort)
        ));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getFeaturedProducts() {
        return ResponseEntity.ok(ApiResponse.success(shopService.getFeatureProducts()));
    }

    @GetMapping("/suggestions")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getSuggestions(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "5") int limit
    ) {
        return ResponseEntity.ok(ApiResponse.success(shopService.getSuggestions(keyword, limit)));
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable UUID uuid) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductByUuid(uuid)));
    }

    @GetMapping("/{uuid}/related")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getRelatedProducts(@PathVariable UUID uuid) {
        return ResponseEntity.ok(ApiResponse.success(shopService.getRelatedProducts(uuid)));
    }
}
