package com.example.TheHeathensStore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Page {
	@RequestMapping("/about")
	public String about() {
		return "about";
	}
	@RequestMapping("/cart")
	public String cart() {
		return "cart";
	}
	@RequestMapping("/shop")
	public String shop() {
		return "shop";
	}
	@RequestMapping("/blog")
	public String blog() {
		return "blog";
	}
	@RequestMapping("/contact")
	public String contact() {
		return "contact";
	}
	@RequestMapping("/index")
	public String index() {
		return "index";
	}
}
