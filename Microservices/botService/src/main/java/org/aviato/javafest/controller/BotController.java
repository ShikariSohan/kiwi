package org.aviato.javafest.controller;

import lombok.extern.slf4j.Slf4j;
import org.aviato.javafest.config.ConfigProperties;
import org.aviato.javafest.model.ChatRequest;
import org.aviato.javafest.model.ChatResponse;
import org.aviato.javafest.model.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/bot")
public class BotController {
    @Autowired
    private RestTemplate template;
    private final ConfigProperties configProperties;
    public BotController( ConfigProperties configProperties) {
        this.configProperties = configProperties;
    }
    @PostMapping("/complete")
    public ResponseEntity<String> completeMessageFromOpenAI(@RequestBody ChatRequest chatRequest){
        String apiUrl = "https://api.openai.com/v1/chat/completions";
        String model= "gpt-3.5-turbo";
       log.info("configProperties: {}", configProperties);
        ChatResponse chatGptResponse = template.postForObject(apiUrl, chatRequest, ChatResponse.class);
        if(chatGptResponse == null){
            return ResponseEntity.notFound().build();
        }
        String content = chatGptResponse.getChoices().get(0).getMessage().getContent();

        System.out.println(content);
        String role = chatGptResponse.getChoices().get(0).getMessage().getRole();

        return ResponseEntity.ok(content);
    }
}
