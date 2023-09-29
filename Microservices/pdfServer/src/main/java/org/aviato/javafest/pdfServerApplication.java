package org.aviato.javafest;


import org.aviato.javafest.config.ConfigProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(ConfigProperties.class)
public class pdfServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(pdfServerApplication.class, args);
    }

}
