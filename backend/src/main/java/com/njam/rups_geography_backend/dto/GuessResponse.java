package com.njam.rups_geography_backend.dto;

import com.njam.rups_geography_backend.models.Answer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class GuessResponse {
    
    private String sessionId;
    
    private Boolean correct;
    
    private Answer answer;

    private Integer pointsEarned;

    private Integer score;
    
    private Integer questionNumber;
    
    private Boolean gameOver;
    
    private String nextImageUrl;
}
