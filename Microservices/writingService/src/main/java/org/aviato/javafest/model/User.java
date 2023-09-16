package org.aviato.javafest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

@Document("user")
public class User {
   @Id
    private String id;
   @Field(name = "name")
   private String name;
    @Field(name = "age")
    private BigDecimal age;

    public User(String id, String name, BigDecimal age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public User() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getAge() {
        return age;
    }

    public void setAge(BigDecimal age) {
        this.age = age;
    }
}
