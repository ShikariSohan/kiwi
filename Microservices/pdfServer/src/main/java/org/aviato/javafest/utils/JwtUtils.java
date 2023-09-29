package org.aviato.javafest.utils;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.aviato.javafest.config.ConfigProperties;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JwtUtils {

    public String generateToken(String id,String JWTKEY) {
        byte[] key = JWTKEY.getBytes(StandardCharsets.UTF_8);

        SecretKeySpec secretKeySpec = new SecretKeySpec(key, SignatureAlgorithm.HS256.getJcaName());
        return Jwts.builder()
                .setSubject(id)
                .setIssuedAt(new Date())
                .signWith(secretKeySpec, SignatureAlgorithm.HS256)
                .compact();
    }
    public String validateToken(String token,String JWTKEY) {
        byte[] key = JWTKEY.getBytes();
        try {
            JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(key).build();
            return jwtParser.parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}
