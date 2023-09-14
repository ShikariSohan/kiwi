package org.aviato.javafest.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    public void sendMail(String to, String subject, String text) {
        try {
//            SimpleMailMessage msg = new SimpleMailMessage();
//            msg.setTo(to);
//            msg.setSubject(subject);
//            msg.setText(text);
////            msg.setHtml(text);
            MimeMessageHelper msg = new MimeMessageHelper(javaMailSender.createMimeMessage(), true);
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText(text, true);
            javaMailSender.send(msg.getMimeMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
