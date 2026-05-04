package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.dto.response.ProductResponseMin;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.entity.ProductImage;
import com.example.TheHeathensStore.mapper.ProductMapper;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductImageRepository productImageRepository;
    private final CloudinaryService cloudinaryService;

    public ProductResponse getProductByUuid(UUID uuid) {
        Product product = productRepository.findByUuid(uuid)
                                           .orElse(null);
        if (product == null) return null;
        List<ProductImage> productImages = productImageRepository.findByProductId(product.getId());
        return productMapper.entityToResponse(product, productImages);
    }

    public List<ProductResponseMin> getAllProductsMin() {
        List<Product> products = productRepository.findAll();
        List<Long> productIds = products.stream()
                                        .mapToLong(Product::getId)
                                        .boxed()
                                        .toList();
        Map<Long, ProductImage> thumbnails = productImageRepository.findAllByProductIdInAndIsThumbnailTrue(productIds)
                                                                   .stream()
                                                                   .collect(Collectors.toMap(ProductImage::getProductId, productImage -> productImage));
        return products.stream()
                       .map(product -> productMapper.entityToProductResponseMin(product, thumbnails.get(product.getId())))
                       .toList();
    }

    @Transactional
    public List<Map<?, ?>> uploadImage(UUID productUuid, MultipartFile thumbnail, MultipartFile[] images) throws IOException {
        List<Map<?, ?>> responses = new ArrayList<>();
        Map<?, ?> result;
        Product product = productRepository.findByUuid(productUuid)
                                           .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy sản phẩm với UUID: " + productUuid.toString()));
        String folderUrl = product.getTeam()
                                  .getName() + "/" + product.getSeason()
                                                            .getName() + "/" + product.getJerseyType();
        result = cloudinaryService.upload(thumbnail, folderUrl);
        ProductImage productImage = ProductImage.builder()
                                                .productId(product.getId())
                                                .imageUrl((result.get("secure_url")).toString())
                                                .isThumbnail(true)
                                                .build();
        productImageRepository.save(productImage);
        responses.add(result);
        for (MultipartFile img : images) {
            result = cloudinaryService.upload(img, folderUrl);
            productImage = ProductImage.builder()
                                       .productId(product.getId())
                                       .imageUrl(result.get("secure_url")
                                                       .toString())
                                       .isThumbnail(false)
                                       .build();
            productImageRepository.save(productImage);
            responses.add(result);
        }
        return responses;
    }
}
