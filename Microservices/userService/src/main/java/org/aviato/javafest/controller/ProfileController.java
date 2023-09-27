package org.aviato.javafest.controller;

import org.aviato.javafest.model.Profile;
import org.aviato.javafest.service.ProfileService;
import org.aviato.javafest.utils.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/profile")
public class ProfileController {
    private final ProfileService profileService;
    private final JwtUtils jwtUtils;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
        this.jwtUtils = new JwtUtils();
    }

    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile, @RequestHeader("Authorization") String token) {
        String userId = jwtUtils.validateToken(token);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        profile.setUserId(userId);
        profileService.createProfile(profile);
        return ResponseEntity.ok(profile);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable String id, @RequestHeader("Authorization") String token){
        String userId = jwtUtils.validateToken(token);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Profile profile = profileService.getProfileById(id);
        if(profile == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if(!profile.getUserId().equals(userId)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(profile);
    }
    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfileByUserId(@RequestHeader("Authorization") String token){
        String userId = jwtUtils.validateToken(token);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(profileService.getAllProfileByUserId(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProfileById(@PathVariable String id, @RequestHeader("Authorization") String token){
        String userId = jwtUtils.validateToken(token);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Profile profile = profileService.getProfileById(id);
        if(profile == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if(!profile.getUserId().equals(userId)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        profileService.deleteProfileById(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/update")
    public ResponseEntity<Profile> updateProfileById(@RequestBody Profile profile, @RequestHeader("Authorization") String token){
        String userId = jwtUtils.validateToken(token);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        String id = profile.getId();
        Profile profile1 = profileService.getProfileById(id);
        if(profile1 == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if(!profile1.getUserId().equals(userId)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        profile.setId(id);
        profile.setUserId(userId);
        profileService.updateProfileById(profile);
        return ResponseEntity.ok(profile);
    }


}
