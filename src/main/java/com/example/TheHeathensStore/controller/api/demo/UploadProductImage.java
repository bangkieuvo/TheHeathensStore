package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import com.example.TheHeathensStore.service.CloudinaryService;
import com.example.TheHeathensStore.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class UploadProductImage {
    private final CloudinaryService cloudinaryService;
    private final ProductImageRepository productImageRepository;
    private final ProductService productService;
    private final ProductRepository productRepository;

    @GetMapping(value = "/product-image-upload")
    public String uploadPage() {
        return "upload";
    }

    @PostMapping(value = "/product-image-upload/upload")
    @ResponseBody
    public List<Map<?, ?>> upload(@RequestParam("productUuid") String productUuid_str, @RequestParam("mainImage") MultipartFile mainImage, @RequestParam("subImages") MultipartFile[] subImages) throws Exception {
        UUID productUuid = UUID.fromString(productUuid_str);
        return productService.uploadImage(productUuid,mainImage,subImages);
    }
}
