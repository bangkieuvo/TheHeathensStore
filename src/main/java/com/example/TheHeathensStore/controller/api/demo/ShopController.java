package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import com.example.TheHeathensStore.filter.ProductFilter;
import com.example.TheHeathensStore.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API_URL}/public/products")
public class ShopController {
    private final ShopService shopService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponse>>> getProducts
            (
                    @RequestParam(value = "page", defaultValue = "1") int pageNumber,
                    @RequestParam(value = "sort", defaultValue = "newest") String sort,
                    @ModelAttribute ProductFilter productFilter
            ) {

        return ResponseEntity.ok(ApiResponse.success(shopService.getShopWithFilter(pageNumber - 1, productFilter, sort)));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getFeaturedProducts() {
        return ResponseEntity.ok(ApiResponse.success(shopService.getFeatureProducts()));
    }
}
