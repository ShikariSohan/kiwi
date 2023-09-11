package org.aviato.javafest.controller;

import org.aviato.javafest.model.RequestUser;
import org.aviato.javafest.model.User;
import org.aviato.javafest.model.VerifyUser;
import org.aviato.javafest.service.MailService;
import org.aviato.javafest.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.aviato.javafest.utils.codeGenarator;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;
    private final MailService mailService;


    public UserController(UserService userService, MailService mailService) {
        this.userService = userService;
        this.mailService = mailService;
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody RequestUser requestUser) {
        if (bodyCheck(requestUser)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please fill all the fields");
        }
        if (userService.checkUser(requestUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exist");
        }
        User user = new User();
        user.setName(requestUser.getName());
        user.setEmail(requestUser.getEmail());
        user.setPassword(requestUser.getPassword());
        user.setCode(new codeGenarator().generateCode());
        user.setVerified(false);
        userService.createUser(user);
        mailService.sendMail(user.getEmail(), "Kiwi - Verification Code", formatTheMessage(user.getCode()));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PostMapping("/verify")
    public ResponseEntity<Object> verifyUser(@RequestBody VerifyUser requestUser) {
        if (!userService.checkUser(requestUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not exist");
        }
        User user = userService.getUserByEmail(requestUser.getEmail());
        if (user.getCode().equals(requestUser.getCode())) {
            user.setVerified(true);
            userService.updateUser(user);
            return ResponseEntity.status(HttpStatus.OK).body("User verified");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong verification code");
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody RequestUser requestUser) {
        if (!userService.checkUser(requestUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not exist");
        }
        User user = userService.getUserByEmail(requestUser.getEmail());
        if (user.getPassword().equals(requestUser.getPassword())) {
//            generate token

            return ResponseEntity.status(HttpStatus.OK).body("User logged in");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong password");
    }

    private String formatTheMessage(String code) {

        return "<h1>Hi, Welcome to KIWI</h1>" +
                "<p>Your verification code is: <b>" + code +
                "</b></p>" +
                "<p>Thank you for using KIWI.</p>";
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
}
