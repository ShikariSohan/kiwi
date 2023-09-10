package org.aviato.javafest.controller;

import org.aviato.javafest.model.User;
import org.aviato.javafest.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/bot")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping
    public  ResponseEntity<Object> createUser(@RequestBody User user){
        userService.createUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public void updateUser(){}
    public void getUser(){}
    @GetMapping
    public ResponseEntity<List<User>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUser());
    }
    public void deleteUser(){}
}
