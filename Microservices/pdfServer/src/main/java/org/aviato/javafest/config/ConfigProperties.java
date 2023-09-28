package org.aviato.javafest.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties("shikari")
public record ConfigProperties(String openAIApiKey,String databaseUrl) {
}
