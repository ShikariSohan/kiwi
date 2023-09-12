package org.aviato.javafest.utils;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JwtUtils {
    public String generateToken(String id) {
        byte[] key = "aviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviato".getBytes(StandardCharsets.UTF_8);
        SecretKeySpec secretKeySpec = new SecretKeySpec(key, SignatureAlgorithm.HS256.getJcaName());
        return Jwts.builder()
                .setSubject(id)
                .setIssuedAt(new Date())
                .signWith(secretKeySpec, SignatureAlgorithm.HS256)
                .compact();
    }
    public String validateToken(String token) {
        byte[] key = "aviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviatoaviato".getBytes();
        try {
            JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(key).build();
            return jwtParser.parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}
