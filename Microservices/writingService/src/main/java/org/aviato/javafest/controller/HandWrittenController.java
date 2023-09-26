package org.aviato.javafest.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.imaging.ImageReadException;
import org.aviato.javafest.model.ImageBody;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@Slf4j
public class HandWrittenController {
    private static final String API_URL = "https://api-inference.huggingface.co/models/microsoft/trocr-base-handwritten";
    @Value("${api.apikey}")
    private static String API_TOKEN;

    @PostMapping
    public ResponseEntity<String> getHandWritten(@RequestBody ImageBody imageBody) throws IOException, ImageReadException {
        String base64Image = imageBody.getImage();
        log.info("Image received: {}", API_TOKEN);

        if (base64Image == null) {
            return ResponseEntity.badRequest().body("Please send a valid image");
        }
        base64Image = base64Image.replaceAll("data:image/png;base64,", "");
        byte[] image = java.util.Base64.getDecoder().decode(base64Image);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_TOKEN);

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<byte[]> requestEntity = new HttpEntity<>(image, headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(API_URL);
        for (int attempt = 1; attempt <= 1; attempt++) { // You can adjust the number of attempts
            try {
                ResponseEntity<String> responseEntity = restTemplate.exchange(
                        builder.toUriString(),
                        HttpMethod.POST,
                        requestEntity,
                        String.class
                );

                if (responseEntity.getStatusCode() == HttpStatus.OK) {
                    String response = responseEntity.getBody();

                    log.info("Response from the API: {}", response);
                    return ResponseEntity.ok(response);
                }
            } catch (HttpServerErrorException e) {
                // Check if the error message indicates that the model is still loading
                if (e.getRawStatusCode() == 503) {
                    // Wait for a while before the next retry
                    try {
                        Thread.sleep(5000); // Wait for 5 seconds (you can adjust this)
                    } catch (InterruptedException ignored) {
                        Thread.currentThread().interrupt();
                    }
                } else {
                    // Handle other server errors
                    System.out.println("Request failed with status code: " + e.getRawStatusCode());
                    return null;
                }
            }

        }
        return ResponseEntity.badRequest().body("Something went wrong");
    }
}
