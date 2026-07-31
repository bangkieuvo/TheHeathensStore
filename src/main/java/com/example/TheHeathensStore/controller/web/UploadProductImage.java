package com.example.TheHeathensStore.controller.web;

import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import com.example.TheHeathensStore.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class UploadProductImage {
    private final ProductService productService;

    @Value("${API_URL}")
    private String apiUrl;

    @GetMapping(value = "/product-image-upload")
    public String uploadPage(Model model) {
        model.addAttribute("apiUrl", apiUrl);
        return "upload";
    }

    @PostMapping("${API_URL}/admin/products/{productUuid}/images")
    @ResponseBody
    public ResponseEntity<ApiResponse<List<Map<?, ?>>>> upload(
            @PathVariable UUID productUuid,
            @RequestParam("mainImage") MultipartFile mainImage,
            @RequestParam("subImages") MultipartFile[] subImages
    ) throws IOException {
        List<Map<?, ?>> uploadedImages = productService.uploadImage(productUuid, mainImage, subImages);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(ApiResponse.of(
                                     HttpStatus.CREATED.value(),
                                     "Product images uploaded successfully",
                                     true,
                                     uploadedImages
                             ));
    }
}
