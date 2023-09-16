package org.aviato.javafest.repository;

import org.aviato.javafest.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {
}
