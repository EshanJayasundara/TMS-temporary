package com.moodle.backend.controller;

import com.moodle.backend.config.OAuth2LoginSuccessHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/email")
public class emailaddress_controller {
    @GetMapping("/get")
    public String emailAddress(){
        return OAuth2LoginSuccessHandler.email;
    }
}
