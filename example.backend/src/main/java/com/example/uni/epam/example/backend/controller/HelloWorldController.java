package com.example.uni.epam.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/hello")
    String greetings() {
        return "Hello world!";
    }

    @GetMapping("/hello/{name}")
    String greetByName(@PathVariable String name) {
        return "Hello " + name.toUpperCase() + "!!";
    }
}
