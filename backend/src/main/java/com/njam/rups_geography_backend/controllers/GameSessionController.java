package com.njam.rups_geography_backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.njam.rups_geography_backend.models.GameSession;
import com.njam.rups_geography_backend.services.GameSessionService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class GameSessionController {

    private final GameSessionService gameSessionService;

    // POST + Body: { "gameMode": "flags|capitals|sights", "format": "classic|endless" }
    //TODO: CLUE VRNEŠ ŽE PRVI

    @PostMapping
    public ResponseEntity<Map<String, Object>> createSession(@RequestBody Map<String, String> request) {
        try {
            String gameMode = request.get("gameMode");
            String format = request.get("format");
            
            // Validate required fields
            if (gameMode == null || gameMode.isBlank()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "gameMode is required"));
            }
            if (format == null || format.isBlank()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "format is required"));
            }

            GameSession session = gameSessionService.createSession(gameMode, format);


            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", session.getId());
            response.put("gameMode", session.getGameMode());
            response.put("format", session.getFormat());
            response.put("createdAt", session.getCreatedAt().toString());
            response.put("questionNumber", session.getCurrentQuestionNumber());
            response.put("score", session.getScore());
            response.put("message", "Session created successfully. Will expire after 10 minutes of inactivity.");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    // GET /api/sessions/{sessionId} -> vrne info o sessionu
    @GetMapping("/{sessionId}")
    public ResponseEntity<Map<String, Object>> getSession(@PathVariable String sessionId) {
        try {
            GameSession session = gameSessionService.getSession(sessionId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", session.getId());
            response.put("gameMode", session.getGameMode());
            response.put("format", session.getFormat());
            response.put("createdAt", session.getCreatedAt().toString());
            response.put("lastActivityAt", session.getLastActivityAt().toString());
            response.put("questionNumber", session.getCurrentQuestionNumber());
            response.put("score", session.getScore());
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    
    // DELETE /api/sessions/{sessionId} -> zbriše session
    @DeleteMapping("/{sessionId}")
    public ResponseEntity<Map<String, String>> endSession(@PathVariable String sessionId) {
        gameSessionService.endSession(sessionId);
        return ResponseEntity.ok(Map.of(
            "message", "Session ended successfully",
            "sessionId", sessionId
        ));
    }


    // HEAD /api/sessions/{sessionId} -> 200 if exists, 404 if not found
    @RequestMapping(value = "/{sessionId}", method = RequestMethod.HEAD)
    public ResponseEntity<Void> checkSession(@PathVariable String sessionId) {
        if (gameSessionService.sessionExists(sessionId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
