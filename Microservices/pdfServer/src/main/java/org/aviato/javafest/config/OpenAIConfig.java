package org.aviato.javafest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class OpenAIConfig {
    private final ConfigProperties configProperties;

    public OpenAIConfig(ConfigProperties configProperties) {
        this.configProperties = configProperties;
    }

    @Bean
    public RestTemplate template(){
        RestTemplate restTemplate=new RestTemplate();

        String openaiApiKey = configProperties.openAIApiKey();
        restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add("Authorization", "Bearer " + openaiApiKey);
            request.getHeaders().add("Content-Type", "application/json");
            return execution.execute(request, body);
        });
        return restTemplate;
    }
}