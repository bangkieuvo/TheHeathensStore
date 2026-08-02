package com.example.TheHeathensStore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private UUID uuid;
    private String name;
    private BigDecimal price;
    private Long stock;
    private Long salesCount;
    private String description;
    private String jerseyType;
    private String teamName;
    private String leagueName;
    private String season;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private ProductImageResponse thumbnail;
    private List<ProductImageResponse>images;
}
