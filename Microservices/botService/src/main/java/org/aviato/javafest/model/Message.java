package org.aviato.javafest.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class Message {
    private String role;
    private String content;
}
