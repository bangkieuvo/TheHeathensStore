package com.example.TheHeathensStore.filter;

import com.example.TheHeathensStore.exception.InvalidRequestException;
import org.springframework.data.domain.Sort;

import java.util.Arrays;

public enum ProductSort {
    PRICE_ASC("price_asc", Sort.by(Sort.Direction.ASC, "price")
                                .and(Sort.by(Sort.Direction.ASC, "id"))),
    PRICE_DESC("price_desc", Sort.by(Sort.Direction.DESC, "price")
                                  .and(Sort.by(Sort.Direction.ASC, "id"))),
    NAME_ASC("name_asc", Sort.by(Sort.Direction.ASC, "name")
                              .and(Sort.by(Sort.Direction.ASC, "id"))),
    NAME_DESC("name_desc", Sort.by(Sort.Direction.DESC, "name")
                                .and(Sort.by(Sort.Direction.ASC, "id"))),
    NEWEST("newest", Sort.by(Sort.Direction.DESC, "id"));

    private final String value;
    private final Sort sort;

    ProductSort(String value, Sort sort) {
        this.value = value;
        this.sort = sort;
    }

    public Sort toSort() {
        return sort;
    }

    public static ProductSort fromValue(String value) {
        return Arrays.stream(values())
                     .filter(productSort -> productSort.value.equals(value))
                     .findFirst()
                     .orElseThrow(() -> new InvalidRequestException("Invalid product sort"));
    }
}
