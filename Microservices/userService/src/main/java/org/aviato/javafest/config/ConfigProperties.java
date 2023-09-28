package org.aviato.javafest.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("shikari")
public record ConfigProperties(String APIKEY, String JWTKEY,String mail,String password) {
}
