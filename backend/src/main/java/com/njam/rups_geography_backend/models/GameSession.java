package com.njam.rups_geography_backend.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//Game session object -> stored in Redis with 10 min TTL

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("game_sessions")
public class GameSession implements Serializable {
    
    @Id
    private String id; // UUID 
    
    private String gameMode; // "flags", "capitals", "sights"
    
    private String format; // "classic", "endless"
    
    private LocalDateTime createdAt;
    
    private LocalDateTime lastActivityAt;
    
    @TimeToLive
    @Builder.Default
    private Long ttl = 600L; // 10 min
    
    // Future game state fields (for when you add game logic)
    private Integer currentQuestionNumber;
    private Integer score;
    
    //Prilagodljiv object za trenutni pravilen odgovor
    private Object currentCorrectAnswer;
    
    public void updateActivity() {
        this.lastActivityAt = LocalDateTime.now();
    }
}
