package com.njam.rups_geography_backend.models;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Answer implements Serializable {

    private String name;
    
    private String country;
    
    private Double lat;
    
    private Double lon;
    
    public boolean hasLocation() {
        return lat != null && lon != null;
    }

    public String getDisplayName() {
        if (country != null && !country.equals(name)) {
            return name + ", " + country;
        }
        return name;
    }
}
