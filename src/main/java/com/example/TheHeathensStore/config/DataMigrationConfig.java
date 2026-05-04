package com.example.TheHeathensStore.config;


import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.UUID;
import com.github.f4b6a3.uuid.UuidCreator;

@Configuration
@RequiredArgsConstructor
public class DataMigrationConfig {

//    private final ProductRepository productRepository;
//
//    @EventListener(ApplicationReadyEvent.class)
//    @Transactional
//    public void migrateUuid() {
//        List<Product> list = productRepository.findAll();
//
//        for (Product p : list)
//            if (true ||p.getUuid() == null) {
//                p.setUuid(UuidCreator.getTimeOrderedEpoch());
//            }
//        System.out.println("UUID migration done!");
//    }
}
