package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.request.UserLoginRequest;
import com.example.TheHeathensStore.utility.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class Login {
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody     UserLoginRequest userLoginRequest) {
        if(userLoginRequest == null) {
            return new StringBuffer().append("NULL").toString();
        }
        return jwtUtil.generateToken(userLoginRequest.getUsername());
    }

    @GetMapping("/checkLogin")
    public String login(@RequestParam String token) {
        if (jwtUtil.validateToken(token)) {
            return jwtUtil.extractUsername(token);
        }
        return new StringBuffer("Hehe wrong!").toString();
    }
}
