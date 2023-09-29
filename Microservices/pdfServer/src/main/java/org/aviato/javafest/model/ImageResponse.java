package org.aviato.javafest.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ImageResponse {
    private String created;
    private List<DataItem> data;
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class DataItem {
        private String url;
    }

}
