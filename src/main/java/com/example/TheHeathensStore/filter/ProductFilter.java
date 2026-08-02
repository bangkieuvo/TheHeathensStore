package com.example.TheHeathensStore.filter;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductFilter {
    private String keyword;
    private String teamName;
    private String leagueName;
    private String seasonName;
    private String jerseyType;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
