package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.dto.response.ProductResponseMin;
import com.example.TheHeathensStore.repository.ProductRepository;
import com.example.TheHeathensStore.service.ProductService;
import com.example.TheHeathensStore.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/demo/shop")
public class ShopController {
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final ShopService shopService;

    @RequestMapping({"","/"})
    public Page<ProductResponse> getshop(){
        return shopService.getShop(0);
    }
    @RequestMapping("/{pageNumber}")
    public Page<ProductResponse> geShop(@PathVariable("pageNumber")int pageNumber){
        return shopService.getShop(pageNumber-1);
    }
}
