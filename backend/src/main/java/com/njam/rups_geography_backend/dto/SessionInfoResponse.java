package com.njam.rups_geography_backend.dto;
import com.njam.rups_geography_backend.models.Answer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for session information.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionInfoResponse {
    
    private String sessionId;
    
    private String gameMode;
    
    private String format;
    
    private String createdAt;
    
    private String lastActivityAt;
    
    private Integer questionNumber;
    
    private Integer score;
    
    private Answer currentCorrectAnswer;
}
