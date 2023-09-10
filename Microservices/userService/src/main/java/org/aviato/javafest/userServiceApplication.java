package org.aviato.javafest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication

public class userServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(userServiceApplication.class, args);
    }

}
