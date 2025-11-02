package com.njam.rups_geography_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class GuessRequest {
    
    @NotBlank(message = "Session ID is required")
    private String sessionId;

    private String guess;
}
