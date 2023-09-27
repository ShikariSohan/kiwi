package org.aviato.javafest.service;

import org.aviato.javafest.model.Profile;
import org.aviato.javafest.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ProfileService {
    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }
    public void createProfile(Profile profile){
        profileRepository.insert(profile);
    }

    public Profile getProfileById(String id) {
        return profileRepository.findById(id).orElse(null);
    }

    public List<Profile> getAllProfileByUserId(String userId) {
        return profileRepository.findAllByUserId(userId);
    }


    public void deleteProfileById(String id) {
        profileRepository.deleteById(id);
    }

    public void updateProfileById(Profile profile) {
        profileRepository.save(profile);
    }
}
