package org.aviato.javafest.service;


import org.aviato.javafest.model.User;
import org.aviato.javafest.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User user){
        userRepository.insert(user);
    }
    public void updateUser(User user){

    }
    public void getUser(){}
    public List<User> getAllUser(){
       return userRepository.findAll();
    }
    public void deleteUser(){}
}
