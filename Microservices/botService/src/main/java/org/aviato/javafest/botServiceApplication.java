package org.aviato.javafest;

import org.aviato.javafest.config.ConfigProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableConfigurationProperties(ConfigProperties.class)
public class botServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(botServiceApplication.class, args);
    }

}
