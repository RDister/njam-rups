package com.njam.rups_geography_backend.services;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.njam.rups_geography_backend.models.GameSession;
import com.njam.rups_geography_backend.repositories.GameSessionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Slf4j
public class GameSessionService {
    
    private final GameSessionRepository sessionRepository;
    
    private static final List<String> GAME_MODES = Arrays.asList("flags", "capitals", "sights");
    private static final List<String> GAME_FORMATS = Arrays.asList("classic", "endless");
    
    //Ustvarimo novi session
    public GameSession createSession(String gameMode, String format) {
        if (!GAME_MODES.contains(gameMode)) {
            throw new IllegalArgumentException("Invalid game mode: " + gameMode + 
                ". Must be one of: " + GAME_MODES);
        }
        
        if (!GAME_FORMATS.contains(format)) {
            throw new IllegalArgumentException("Invalid format: " + format + 
                ". Must be one of: " + GAME_FORMATS);
        }
        
        // Create session
        LocalDateTime now = LocalDateTime.now();
        GameSession session = GameSession.builder()
                .id(UUID.randomUUID().toString())
                .gameMode(gameMode)
                .format(format)
                .createdAt(now)
                .lastActivityAt(now)
                .currentQuestionNumber(1)
                .score(0)
                .build();
        
        // Save to Redis (will auto-expire after 10 minutes)
        GameSession savedSession = sessionRepository.save(session);
        
        log.info("Created new game session: {} (mode: {}, format: {})", 
                savedSession.getId(), gameMode, format);
        
        return savedSession;
    }
    
    //Dobimo obstoječi session
    public GameSession getSession(String sessionId) {
        GameSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException(
                    "Session not found or expired: " + sessionId));
        
        // Update activity timestamp and save (resets TTL)
        session.updateActivity();
        sessionRepository.save(session);
        
        return session;
    }
    
    //Zbrišemo session
    public void endSession(String sessionId) {
        if (sessionRepository.existsById(sessionId)) {
            sessionRepository.deleteById(sessionId);
            log.info("Ended session: {}", sessionId);
        } else {
            log.warn("Attempted to end non-existent session: {}", sessionId);
        }
    }
    
    //Preverimo če session obstaja
    public boolean sessionExists(String sessionId) {
        return sessionRepository.existsById(sessionId);
    }
}
