package org.aviato.javafest.controller;

import lombok.extern.slf4j.Slf4j;
import org.aviato.javafest.config.ConfigProperties;
import org.aviato.javafest.model.ImageResponse;
import org.aviato.javafest.model.Pdf;
import org.aviato.javafest.model.Prompts;
import org.aviato.javafest.model.Payload;
import org.aviato.javafest.service.PdfService;
import org.aviato.javafest.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/bot")
public class pdfController {
    @Autowired
    private RestTemplate template;

    private final PdfService pdfService;
    private final ConfigProperties configProperties;
    private final JwtUtils jwtUtils;

    public pdfController(PdfService pdfService, ConfigProperties configProperties) {
        this.pdfService = pdfService;
        this.configProperties = configProperties;
        this.jwtUtils = new JwtUtils();

    }

    @PostMapping("/pdf")
    public ResponseEntity<String> saveToDb(@RequestBody Pdf pdf, @RequestHeader("Authorization") String token) {
        log.info("pdf: {}", pdf);
        log.info("token: {}", token);
        String id = jwtUtils.validateToken(token, configProperties.JWTKEY());
        if (id == null) {
            return ResponseEntity.badRequest().body("Invalid Token");
        }
        pdfService.createPdf(pdf);
        return ResponseEntity.ok("Saved");
    }

    @GetMapping("/pdf/{userId}")
    public ResponseEntity<List<Pdf>> getAllPdfByUserId(@PathVariable("userId") String userid, @RequestHeader("Authorization") String token) {
        log.info("userid: {}", userid);
        log.info("token: {}", token);

        String id = jwtUtils.validateToken(token, configProperties.JWTKEY());
        if (id == null) {
            return ResponseEntity.badRequest().body(null);
        }
        List<Pdf> pdfs = pdfService.getAllPdfByUserId(userid);
        return ResponseEntity.ok(pdfs);
    }
    @DeleteMapping("/pdf/{id}")
    public ResponseEntity<String> deletePdf(@PathVariable String id, @RequestHeader("Authorization") String token) {
        String userid = jwtUtils.validateToken(token, configProperties.JWTKEY());
        if (userid == null) {
            return ResponseEntity.badRequest().body("Invalid Token");
        }
        pdfService.deletePdf(id);
        return ResponseEntity.ok("Deleted");
    }
    @PostMapping("/genarateimages")
       public ResponseEntity<List<String>> genarateImages(@RequestBody Prompts p, @RequestHeader("Authorization") String token) {
            String userid = jwtUtils.validateToken(token, configProperties.JWTKEY());
            List<String> images = null;
            List<String> prompts = p.getPrompts();


            if (userid == null) {
                return ResponseEntity.badRequest().body(null);
            }
        for (int i = 0; i < prompts.size(); i++) {
            String prompt = prompts.get(i);
            String url = "https://api.openai.com/v1/images/generations";
            Payload payload = new Payload(prompt,"256x256",1);
            ImageResponse response = template.postForObject(url, payload, ImageResponse.class);
            if(response == null){
                return ResponseEntity.notFound().build();
            }
            String imageUrl = response.getData().get(0).getUrl();
            prompts.set(i,imageUrl);
        }



            return ResponseEntity.ok(prompts);
        }

}
