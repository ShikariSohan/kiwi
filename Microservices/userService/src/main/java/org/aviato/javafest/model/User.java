package org.aviato.javafest.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document("user")
public class User {
    @Id
    private String id;
    @Field(name = "name")
    private String name;
    @Field(name = "email")
    private String email;
    @Field(name = "password")
    private String password;
    @Field(name = "code")
    private String code;
    @Field(name = "isVerified")
    private boolean isVerified;
}
