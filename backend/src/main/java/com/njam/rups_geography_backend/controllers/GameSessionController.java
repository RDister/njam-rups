package com.njam.rups_geography_backend.controllers;

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

import com.njam.rups_geography_backend.dto.GuessRequest;
import com.njam.rups_geography_backend.dto.GuessResponse;
import com.njam.rups_geography_backend.dto.SessionInfoResponse;
import com.njam.rups_geography_backend.dto.SightsGuessRequest;
import com.njam.rups_geography_backend.dto.SightsGuessResponse;
import com.njam.rups_geography_backend.models.Answer;
import com.njam.rups_geography_backend.models.GameSession;
import com.njam.rups_geography_backend.services.GameLogicService;
import com.njam.rups_geography_backend.services.GameSessionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
@Slf4j
public class GameSessionController {

    private final GameSessionService gameSessionService;
    private final GameLogicService gameLogicService;


    @PostMapping("/start")
    public ResponseEntity<GuessResponse> startGame(@RequestBody Map<String, String> request) {
        try {
            String gameMode = request.get("gameMode");
            String format = request.get("format");
            
            // Validate required fields
            if (gameMode == null || gameMode.isBlank()) {
                return ResponseEntity.badRequest().build();
            }
            if (format == null || format.isBlank()) {
                return ResponseEntity.badRequest().build();
            }


            // Create session
            GameSession session = gameSessionService.createSession(gameMode, format);
            log.info("Created game session: {}", session.getId());

            // Generate first question
            Answer firstQuestion = gameLogicService.startNewQuestion(session.getId());
            
            GuessResponse response = GuessResponse.builder()
                .sessionId(session.getId())
                .correct(null)              
                .answer(null)       
                .pointsEarned(null)        
                .score(0)
                .questionNumber(1)
                .gameOver(false)
                .nextImageUrl(gameLogicService.generateImageUrl(gameMode, firstQuestion))
                .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (IllegalArgumentException e) {
            log.error("Failed to start game: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    //For capitals and flags
    @PostMapping("/guess")
    public ResponseEntity<GuessResponse> submitGuess(@Valid @RequestBody GuessRequest request) {
        try {
            log.info("Processing guess for session: {}", request.getSessionId());
            GuessResponse response = gameLogicService.processGuess(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException | IllegalStateException e) {
            log.error("Invalid guess request: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("Error processing guess", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    //For sights
    @PostMapping("/guess/sights")
    public ResponseEntity<SightsGuessResponse> submitSightsGuess(@Valid @RequestBody SightsGuessRequest request) {
        try {
            log.info("Processing sights guess for session: {}", request.getSessionId());
            SightsGuessResponse response = gameLogicService.processSightsGuess(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException | IllegalStateException e) {
            log.error("Invalid sights guess request: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("Error processing sights guess", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    //Get session info.
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<SessionInfoResponse> getSession(@PathVariable String sessionId) {
        try {
            GameSession session = gameSessionService.getSession(sessionId);
            
            SessionInfoResponse response = SessionInfoResponse.builder()
                .sessionId(session.getId())
                .gameMode(session.getGameMode())
                .format(session.getFormat())
                .createdAt(session.getCreatedAt().toString())
                .lastActivityAt(session.getLastActivityAt().toString())
                .questionNumber(session.getCurrentQuestionNumber())
                .score(session.getScore())
                .currentCorrectAnswer(session.getCurrentCorrectAnswer())
                .build();
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //End a game session
    @DeleteMapping("/end/{sessionId}")
    public ResponseEntity<Map<String, String>> endGame(@PathVariable String sessionId) {
        gameSessionService.endSession(sessionId);
        log.info("Game session ended: {}", sessionId);
        return ResponseEntity.ok(Map.of(
            "message", "Game ended successfully",
            "sessionId", sessionId
        ));
    }

    //Check if game session exists.
    @RequestMapping(value = "/session/{sessionId}", method = RequestMethod.HEAD)
    public ResponseEntity<Void> checkSession(@PathVariable String sessionId) {
        if (gameSessionService.sessionExists(sessionId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
