package com.njam.rups_geography_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.njam.rups_geography_backend.data.CapitalsData;
import com.njam.rups_geography_backend.data.CountriesData;
import com.njam.rups_geography_backend.data.LandmarksData;
import com.njam.rups_geography_backend.dto.GuessRequest;
import com.njam.rups_geography_backend.dto.GuessResponse;
import com.njam.rups_geography_backend.dto.SightsGuessRequest;
import com.njam.rups_geography_backend.dto.SightsGuessResponse;
import com.njam.rups_geography_backend.models.Answer;
import com.njam.rups_geography_backend.models.GameSession;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameLogicService {
    
    private final GameSessionService sessionService;
    
    private static final int CLASSIC_MODE_QUESTIONS = 10;
    private static final double EARTH_RADIUS_KM = 6371.0;
    
    //Tu procesiramo guess requeste od flags in capitals
    public GuessResponse processGuess(GuessRequest request) {
        
        GameSession session = sessionService.getSession(request.getSessionId());
        if (session == null) {
            throw new IllegalArgumentException("Invalid session ID");
        }
        
        if (session.getCurrentCorrectAnswer() == null) {
            throw new IllegalStateException("No active question in session");
        }
        
        boolean isCorrect = checkTextAnswer(request.getGuess(), session.getCurrentCorrectAnswer().getName());
        int pointsEarned = 0;

        session.setCurrentQuestionAttempts(session.getCurrentQuestionAttempts() + 1);

        if (isCorrect && session.getCurrentQuestionAttempts() == 1) {
            pointsEarned = 1;
        }
        
        Answer correctAnswer = session.getCurrentCorrectAnswer();
        Answer userAnswer = isCorrect ? correctAnswer : findAnswerByName(session.getGameMode(), request.getGuess());
        String currentImageUrl = generateImageUrl(session.getGameMode(), correctAnswer);
        
        if (isCorrect) {
            session.setScore(session.getScore() + pointsEarned);
            session.setCurrentQuestionNumber(session.getCurrentQuestionNumber() + 1);
        }
        session.updateActivity();
   
        boolean gameOver = false;
        if ("classic".equalsIgnoreCase(session.getFormat())) {
            gameOver = session.getCurrentQuestionNumber() >= CLASSIC_MODE_QUESTIONS;
        }
        
        String nextImageUrl = currentImageUrl; 
        if (isCorrect && !gameOver) {
            Answer nextAnswer;
            do {
                nextAnswer = generateNextQuestion(session.getGameMode());
            } while (nextAnswer.getName().equals(correctAnswer.getName()));
            
            session.setCurrentCorrectAnswer(nextAnswer);
            nextImageUrl = generateImageUrl(session.getGameMode(), nextAnswer);
            sessionService.updateSession(session);
        } else if (gameOver) {
            sessionService.endSession(session.getId());
            nextImageUrl = null;
        } else {
            sessionService.updateSession(session);
        }
        
        return GuessResponse.builder()
            .sessionId(session.getId())
            .correct(isCorrect)
            .answer(userAnswer) 
            .pointsEarned(pointsEarned)
            .score(session.getScore())
            .questionNumber(session.getCurrentQuestionNumber())
            .gameOver(gameOver)
            .nextImageUrl(nextImageUrl)
            .hint(correctAnswer.getName().substring(0, 1))
            .build();
    }

    //Tu procesiramo guess requeste od sights
    public SightsGuessResponse processSightsGuess(SightsGuessRequest request) {

        GameSession session = sessionService.getSession(request.getSessionId());
        if (session == null) {
            throw new IllegalArgumentException("Invalid session ID");
        }
        
        if (session.getCurrentCorrectAnswer() == null) {
            throw new IllegalStateException("No active question in session");
        }
        
        double distanceKm = calculateDistance(
            request.getLat(), request.getLon(),
            session.getCurrentCorrectAnswer().getLat(), 
            session.getCurrentCorrectAnswer().getLon()
        );
        
        int pointsEarned = calculateSightsPoints(distanceKm);
        boolean isCorrect = pointsEarned > 0;
        
        Answer correctAnswer = session.getCurrentCorrectAnswer();
        
        session.setScore(session.getScore() + pointsEarned);
        session.setCurrentQuestionNumber(session.getCurrentQuestionNumber() + 1);
        session.updateActivity();
        
        boolean gameOver = false;
        if ("classic".equalsIgnoreCase(session.getFormat())) {
            gameOver = session.getCurrentQuestionNumber() >= CLASSIC_MODE_QUESTIONS;
        }
        
        String nextImageUrl = null;
        if (!gameOver) {
            Answer nextAnswer;
            do {
                nextAnswer = generateNextQuestion(session.getGameMode());
            } while (nextAnswer.getName().equals(correctAnswer.getName()));
            
            session.setCurrentCorrectAnswer(nextAnswer);
            nextImageUrl = generateImageUrl(session.getGameMode(), nextAnswer);
            sessionService.updateSession(session);
        } else {
            sessionService.endSession(session.getId());
        }
        
        String distanceDescription = getDistanceDescription(distanceKm);
        
        return SightsGuessResponse.builder()
            .sessionId(session.getId())
            .correct(isCorrect)
            .answer(correctAnswer)
            .pointsEarned(pointsEarned)
            .score(session.getScore())
            .questionNumber(session.getCurrentQuestionNumber())
            .gameOver(gameOver)
            .nextImageUrl(nextImageUrl)
            .distanceKm(distanceKm)
            .distanceDescription(distanceDescription)
            .build();
    }
    

    //To kličemo ko začnemo z prvim vprašanjem
    public Answer startNewQuestion(String sessionId) {
        GameSession session = sessionService.getSession(sessionId);
        if (session == null) {
            throw new IllegalArgumentException("Invalid session ID");
        }
        
        Answer answer = generateNextQuestion(session.getGameMode());
        session.setCurrentCorrectAnswer(answer);
        session.setCurrentQuestionNumber(0);
        session.setScore(0);
        session.setCurrentQuestionAttempts(0);
        session.updateActivity();
        
        sessionService.updateSession(session);
        return answer;
    }
    

    private boolean checkTextAnswer(String userGuess, String correctAnswer) {
        if (userGuess == null || correctAnswer == null) {
            return false;
        }
        return userGuess.trim().equalsIgnoreCase(correctAnswer.trim());
    }
    
    private Answer findAnswerByName(String gameMode, String name) {
        if (name == null) {
            return null;
        }
        
        List<Answer> answerList = switch (gameMode.toLowerCase()) {
            case "flags" -> CountriesData.COUNTRIES;
            case "capitals" -> CapitalsData.CAPITALS;
            case "sights" -> LandmarksData.LANDMARKS;
            default -> null;
        };
        
        if (answerList == null) {
            return null;
        }
        
        return answerList.stream()
            .filter(a -> name.trim().equalsIgnoreCase(a.getName().trim()))
            .findFirst()
            .orElse(null);
    }
    

    //Helper za razdaljo med 2-ema točkama na Zemlji
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double lat1Rad = Math.toRadians(lat1);
        double lat2Rad = Math.toRadians(lat2);
        double deltaLat = Math.toRadians(lat2 - lat1);
        double deltaLon = Math.toRadians(lon2 - lon1);
        
        double a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                   Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                   Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return EARTH_RADIUS_KM * c;
    }
    
    
    //Točkovanje za ugibanje znamenitosti
    private int calculateSightsPoints(double distanceKm) {
        final int MAX_POINTS = 1000;

        if (distanceKm <= 10) return MAX_POINTS;

        double scale = 2000.0; 
        double score = MAX_POINTS * Math.exp(-distanceKm / scale);

        return (int) Math.max(0, Math.round(score));
    }


    
    //Optional I guess...
    private String getDistanceDescription(double distanceKm) {
        if (distanceKm <= 50) {
            return "Perfect! Almost exact!";
        } else if (distanceKm <= 100) {
            return "Very close!";
        } else if (distanceKm <= 200) {
            return "Pretty good!";
        } else if (distanceKm <= 500) {
            return "Not bad!";
        } else if (distanceKm <= 1000) {
            return "Getting warmer...";
        } else if (distanceKm <= 2000) {
            return "Too far, but you tried!";
        } else {
            return "Way off! Keep practicing!";
        }
    }
    
    //Generiramo naslednji pravilni odgovor glede na gamemode
    private Answer generateNextQuestion(String gameMode) {
        return switch (gameMode.toLowerCase()) {
            case "flags" -> CountriesData.getRandomCountry();
            case "capitals" -> CapitalsData.getRandomCapital();
            case "sights" -> LandmarksData.getRandomLandmark();
            default -> throw new IllegalArgumentException("Invalid game mode: " + gameMode);
        };
    }
    
    public String generateImageUrl(String gameMode, Answer answer) {
        return switch (gameMode.toLowerCase()) {
            case "flags" -> {
                int index = CountriesData.COUNTRIES.indexOf(answer);
                yield "/images/flags/flag" + (index + 1) + ".png";
            }
            case "capitals" -> {
                int index = CapitalsData.CAPITALS.indexOf(answer);
                yield "/images/capitals/capital" + (index + 1) + ".png";
            }
            case "sights" -> {
                int index = LandmarksData.LANDMARKS.indexOf(answer);
                yield "/images/sights/sight" + (index + 1) + ".jpg";
            }
            default -> null;
        };
    }
    
}
