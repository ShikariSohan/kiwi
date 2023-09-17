package org.aviato.javafest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@Slf4j
public class HandWrittenController {
    @PostMapping
    public ResponseEntity<String> getHandWritten(@RequestParam("image") MultipartFile imageFile){
        if(imageFile.isEmpty()){
            return ResponseEntity.badRequest().body("Please upload an image");
        }
//        print a random string

        return ResponseEntity.ok("Hello World");

    }
}
