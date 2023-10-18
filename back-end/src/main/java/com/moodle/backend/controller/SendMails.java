package com.moodle.backend.controller;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendMails {
    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String toEmail, String subject, String body) throws EmailException {
        HtmlEmail email = new HtmlEmail();
        email.setHostName("smtp.gmail.com"); // Set your SMTP server host
        email.setSmtpPort(587); // Set your SMTP server port
        email.setAuthenticator(new DefaultAuthenticator("<set-your-gmail-address>", "<your email credentials>")); // Set
                                                                                                                  // your
                                                                                                                  // email
                                                                                                                  // and
                                                                                                                  // password
        email.setSSLOnConnect(true); // Use SSL for secure connection (optional)

        email.setFrom("<set-your-gmail-address>");
        email.addTo(toEmail);
        email.setSubject(subject);
        email.setHtmlMsg(body);
        System.out.println("Mail Send...");
        email.send();
    }

}