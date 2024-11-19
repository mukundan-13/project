package com.rentwheelz.rentwheelz.controllers;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/home")
public class HomePageController {

  
    @GetMapping("/new")
    public String register() {
        return "User registered successfully!";
    }

  
}
