package org.aviato.javafest.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Pdf {
    String id;
    String title;
    String url;
    String userId;
    String description;

}
