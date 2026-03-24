package com.example.TheHeathensStore.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PublicController {
	@GetMapping({"/index","/home"})
	public String index() {
		return "public/index";
	}
	@GetMapping("/about")
	public String about() {
		return "public/about";
	}
	@GetMapping("/contact")
	public String contact() {
		return "public/contact";
	}
	@GetMapping("/shop")
	public String shop() {
		return "public/shop";
	}
	@GetMapping("/product-detail")
	public String product_detail() {
		return "public/product-detail";
	}
}
