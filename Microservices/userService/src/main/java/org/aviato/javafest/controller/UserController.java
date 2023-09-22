package org.aviato.javafest.controller;

import lombok.extern.slf4j.Slf4j;
import org.aviato.javafest.model.RequestUser;
import org.aviato.javafest.model.User;
import org.aviato.javafest.model.VerifyUser;
import org.aviato.javafest.service.MailService;
import org.aviato.javafest.service.UserService;
import org.aviato.javafest.utils.JwtUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.aviato.javafest.utils.codeGenarator;

@RestController
@RequestMapping("api/user")
@Slf4j
public class UserController {

    private final UserService userService;
    private final MailService mailService;

    private final codeGenarator codeGenarator;

    private final JwtUtils jwtUtils;


    public UserController(UserService userService, MailService mailService) {
        this.userService = userService;
        this.mailService = mailService;
        this.codeGenarator = new codeGenarator();
        this.jwtUtils = new JwtUtils();
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody RequestUser requestUser) {
        if (bodyCheck(requestUser)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please fill all the fields");
        }
        if (userService.checkUser(requestUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exist");
        }
        User user = new User();
        user.setName(requestUser.getName());
        user.setEmail(requestUser.getEmail());
        user.setPassword(codeGenarator.hashPassword(requestUser.getPassword()));
        user.setCode(codeGenarator.generateCode());
        user.setVerified(false);
        userService.createUser(user);
        mailService.sendMail(user.getEmail(), "Kiwi - Verification Code", formatTheMessage(user.getCode()));
        return ResponseEntity.status(HttpStatus.OK).body(user.getId());
    }


    @PostMapping("/verify")
    public ResponseEntity<Object> verifyUser(@RequestBody VerifyUser requestUser) {
        if (!userService.checkUser(requestUser.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not exist");
        }
        User user = userService.getUserById(requestUser.getId());
        log.info(user.getCode());
        log.info(requestUser.getCode());
        if (user.getCode().equals(requestUser.getCode())) {
            user.setVerified(true);
            userService.updateUser(user);
            return ResponseEntity.status(HttpStatus.OK).body("User verified");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong verification code");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody RequestUser requestUser) {
//
//        if (!userService.checkUser(requestUser.getEmail())) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not exist");
//        }
        User user = userService.getUserByEmail(requestUser.getEmail());
        if (codeGenarator.checkPassword(requestUser.getPassword(), user.getPassword())) {
            String token = jwtUtils.generateToken(user.getId());
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", token);
            return ResponseEntity.status(HttpStatus.OK).headers(headers).body(token);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong password");
    }

    @GetMapping("/getOne")
    public ResponseEntity<User> getOne(@RequestHeader("Authorization") String token) {

        String id = jwtUtils.validateToken(token);
        if (id == null) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        User user = userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    private String formatTheMessage(String code) {

        return "<html>" +
                "<head></head>" +
                "<body>" +
                "<div class='container'>" +
//                "<img src='your_logo.png' alt='KIWI Logo' class='logo'>" +
                "<h1>Hi, Welcome to <span style='color: #425119; font-family: Caveat, cursive;'>kiwi</span></h1>" +
                "<p>Your verification code is: <b>" + code + "</b></p>" +
                "<p>Thank you for choosing us.</p>" +
                "<p>Visit our website at <a href='https://www.kiwi.com'>www.kiwi.com</a></p>" +
                "</div>" +
                "</body>" +
                "</html>";



        }

    private boolean bodyCheck(RequestUser requestUser) {
        if (requestUser == null)
            return true;
        if (requestUser.getPassword().length() < 6)
            return true;
        if (!requestUser.getEmail().contains("@"))
            return true;
        return requestUser.getName().length() < 3;
    }

    public void updateUser() {
    }

    public void getUser() {
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUser() {
        return ResponseEntity.ok(userService.getAllUser());
    }

    public void deleteUser() {
    }
    @PostMapping("/resend")
    public ResponseEntity<Boolean> resendCode(@RequestHeader("Authorization") String token) {
        String id = jwtUtils.validateToken(token);
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        User user = userService.getUserById(id);
        mailService.sendMail(user.getEmail(), "Kiwi - Verification Code (Resend)", formatTheMessage(user.getCode()));
        return ResponseEntity.ok(true);
    }
}
