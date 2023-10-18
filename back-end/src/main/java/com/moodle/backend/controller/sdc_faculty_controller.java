package com.moodle.backend.controller;

import com.moodle.backend.entity.sdc_faculty;
import com.moodle.backend.model.Email;
import com.moodle.backend.service.sdc_faculty_service;
import jakarta.mail.MessagingException;
import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/")
public class sdc_faculty_controller {
    @Autowired
    sdc_faculty_service sdcFacultyService;

    @GetMapping("/faculty/get")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<sdc_faculty> get(){
        return sdcFacultyService.get();
    }

    @PostMapping("/faculty/save")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public sdc_faculty save(@RequestBody sdc_faculty sdcFaculty){
        return sdcFacultyService.save(sdcFaculty);
    }

    @DeleteMapping("/faculty/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void get(@PathVariable Long id){
        sdcFacultyService.delete(id);
    }

    @Autowired
    private SendMails senderService;

    @PostMapping("/email/send")
    public String sendMailsToDeans(@RequestBody List<Email> emails) throws MessagingException, EmailException {
        for (Email email: emails) {
            senderService.sendSimpleEmail(email.getTo(), email.getSubject(), email.getBody());
        }
        return "Emails sent...";
    }
}
