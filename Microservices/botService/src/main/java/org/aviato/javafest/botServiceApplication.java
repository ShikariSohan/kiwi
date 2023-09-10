package org.aviato.javafest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
public class botServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(botServiceApplication.class, args);
    }

}
