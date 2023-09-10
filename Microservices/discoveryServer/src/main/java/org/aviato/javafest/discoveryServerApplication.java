package org.aviato.javafest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class discoveryServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(discoveryServerApplication.class, args);
    }

}
