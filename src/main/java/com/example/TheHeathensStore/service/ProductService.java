package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.dto.response.ProductResponseMin;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.entity.ProductImage;
import com.example.TheHeathensStore.exception.InvalidRequestException;
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
                                                                   .collect(Collectors.toMap(productImage -> productImage.getProduct()
                                                                                                                         .getId(), productImage -> productImage));
        return products.stream()
                       .map(product -> productMapper.entityToProductResponseMin(product, thumbnails.get(product.getId())))
                       .toList();
    }

    @Transactional
    public List<Map<?, ?>> uploadImage(UUID productUuid, MultipartFile thumbnail, MultipartFile[] images) throws IOException {
        if (thumbnail == null || thumbnail.isEmpty()) {
            throw new InvalidRequestException("A main product image is required");
        }
        List<Map<?, ?>> responses = new ArrayList<>();
        Map<?, ?> result;
        Product product = productRepository.findByUuid(productUuid)
                                           .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy sản phẩm với UUID: " + productUuid.toString()));
        String teamName = product.getTeam() == null ? "unassigned-team" : product.getTeam()
                                                                                 .getName();
        String seasonName = product.getSeason() == null ? "unassigned-season" : product.getSeason()
                                                                                       .getName();
        String folderUrl = teamName + "/" + seasonName + "/" + product.getJerseyType();
        List<ProductImage> currentThumbnails = productImageRepository.findByProductId(product.getId())
                                                                     .stream()
                                                                     .filter(ProductImage::isThumbnail)
                                                                     .peek(image -> image.setThumbnail(false))
                                                                     .toList();
        productImageRepository.saveAll(currentThumbnails);
        result = cloudinaryService.upload(thumbnail, folderUrl);
        ProductImage productImage = ProductImage.builder()
                                                .product(product)
                                                .imageUrl((result.get("secure_url")).toString())
                                                .isThumbnail(true)
                                                .build();
        productImageRepository.save(productImage);
        responses.add(result);
        MultipartFile[] additionalImages = images == null ? new MultipartFile[0] : images;
        for (MultipartFile img : additionalImages) {
            if (img == null || img.isEmpty()) continue;
            result = cloudinaryService.upload(img, folderUrl);
            productImage = ProductImage.builder()
                                       .product(product)
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
