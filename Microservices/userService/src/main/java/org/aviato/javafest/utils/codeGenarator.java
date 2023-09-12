package org.aviato.javafest.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class codeGenarator {
    public String generateCode() {
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" ;
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 4; i++) {
            int index = (int) (AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }
    public String hashPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    public boolean checkPassword(String password, String hash) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(password, hash);
    }
}
