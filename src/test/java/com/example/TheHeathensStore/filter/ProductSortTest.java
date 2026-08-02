package com.example.TheHeathensStore.filter;

import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Sort;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ProductSortTest {

    @Test
    void shouldSortNewestProductsByCreatedAtThenIdDescending() {
        Sort sort = ProductSort.fromValue("newest")
                               .toSort();

        Sort.Order createdAtOrder = sort.getOrderFor("createdAt");
        Sort.Order idOrder = sort.getOrderFor("id");

        assertNotNull(createdAtOrder);
        assertNotNull(idOrder);
        assertEquals(Sort.Direction.DESC, createdAtOrder.getDirection());
        assertEquals(Sort.Direction.DESC, idOrder.getDirection());
    }

    @Test
    void shouldSortBestSellingProductsBySalesCountFirst() {
        Sort sort = ProductSort.fromValue("best_selling").toSort();

        assertEquals(Sort.Direction.DESC, sort.getOrderFor("salesCount").getDirection());
        assertEquals(Sort.Direction.DESC, sort.getOrderFor("createdAt").getDirection());
    }
}
