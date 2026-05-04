package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.dto.response.ProductResponseMin;
import com.example.TheHeathensStore.dto.response.UserResponse;
import com.example.TheHeathensStore.entity.*;
import com.example.TheHeathensStore.repository.*;
import com.example.TheHeathensStore.service.ProductService;
import com.example.TheHeathensStore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestRepoController {
    private final ProductService productService;
    private final NationRepository nationRepository;
    private final LeagueRepository leagueRepository;
    private final TeamRepository teamRepository;
    private final SeasonRepository seasonRepository;
    private final UserService userService;
    private final ProductRepository productRepository;

    // --- NATIONS ---
    @GetMapping("/nations/all")
    public List<Nation> getAllNations() {
        return nationRepository.findAll();
    }

    @GetMapping("/nations/{id}")
    public Nation getNationById(@PathVariable Long id) {
        return nationRepository.findById(id)
                               .orElse(null);
    }

    // --- LEAGUES ---
    @GetMapping("/leagues/all")
    public List<League> getAllLeagues() {
        return leagueRepository.findAll();
    }

    @GetMapping("/leagues/{id}")
    public League getLeagueById(@PathVariable Long id) {
        return leagueRepository.findById(id)
                               .orElse(null);
    }

    // --- TEAMS ---
    @GetMapping("/teams/all")
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @GetMapping("/teams/{id}")
    public Team getTeamById(@PathVariable Long id) {
        return teamRepository.findById(id)
                             .orElse(null);
    }

    // --- SEASONS ---
    @GetMapping("/seasons/all")
    public List<Season> getAllSeasons() {
        return seasonRepository.findAll();
    }

    // --- PRODUCTS ---
    @GetMapping("/products/all")
    public List<ProductResponseMin> getAllProducts() {
        return this.productService.getAllProductsMin();
    }

    @GetMapping("/products/{uuid}")
    public ProductResponse getProductById(@PathVariable UUID uuid) {
        return productService.getProductByUuid(uuid);
    }

    @GetMapping("products/leagueId/{leagueId}")
    public List<Product> getByLeagueId(@PathVariable Long leagueId) {
        System.out.println("Called");
        return productRepository.findByTeam_League_Id(leagueId);
    }

    @GetMapping("/user/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return this.userService.getById(id);
    }
}