package org.aviato.javafest.repository;

import org.aviato.javafest.model.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProfileRepository  extends MongoRepository<Profile,String> {

    List<Profile> findAllByUserId(String userId);
}
