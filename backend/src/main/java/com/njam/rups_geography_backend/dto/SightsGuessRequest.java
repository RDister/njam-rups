package com.njam.rups_geography_backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * Specialized DTO for SIGHTS mode guess request.
 * Extends GuessRequest with coordinate-based guessing.
 */
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SightsGuessRequest extends GuessRequest {
    
    @NotNull(message = "Latitude is required for sights mode")
    private Double lat;

    @NotNull(message = "Longitude is required for sights mode")
    private Double lon;
}
