package org.aviato.javafest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class OpenAIConfig {
    @Bean
    public RestTemplate template(){
        RestTemplate restTemplate=new RestTemplate();
        String openaiApiKey = "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";
        restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add("Authorization", "Bearer " + openaiApiKey);
            request.getHeaders().add("Content-Type", "application/json");
            return execution.execute(request, body);
        });
        return restTemplate;
    }
}