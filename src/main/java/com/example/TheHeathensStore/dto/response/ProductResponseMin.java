package com.example.TheHeathensStore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseMin {
    private UUID uuid;
    private String name;
    private BigDecimal price;
    private Long stock;
    private String jerseyType;
    private String teamName;
    private String season;
    private String thumbnailUrl;
}
