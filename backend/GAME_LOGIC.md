# Game Logic Implementation

## Overview

The game logic handles guess validation, scoring, and question progression for all three game modes: FLAGS, CAPITALS, and SIGHTS.

## API Endpoints

### 1. Start Game

**POST** `/api/game/start/{sessionId}`

Initializes the first question for a game session.

**Response:**

```json
{
    "imageUrl": "/GuessTheCountry/France.png",
    "questionPrompt": "Which country does this flag belong to?",
    "questionNumber": 1
}
```

---

### 2. Submit Guess

**POST** `/api/game/guess`

**Request Body for FLAGS/CAPITALS modes:**

```json
{
    "sessionId": "uuid-string",
    "guess": "France"
}
```

**Request Body for SIGHTS mode:**

```json
{
    "sessionId": "uuid-string",
    "lat": 48.8584,
    "lon": 2.2945
}
```

**Response:**

```json
{
    "correct": true,
    "correctAnswer": {
        "name": "France",
        "country": "France",
        "lat": 46.6034,
        "lon": 1.8883
    },
    "pointsEarned": 1,
    "distanceKm": null,
    "totalScore": 5,
    "questionNumber": 6,
    "gameOver": false,
    "nextImageUrl": "/GuessTheCountry/Germany.png",
    "nextQuestionPrompt": "Which country does this flag belong to?"
}
```

---

## Game Modes

### FLAGS Mode

-   **Question:** User sees a flag image
-   **Answer:** Country name (string)
-   **Scoring:** 1 point for correct, 0 for incorrect
-   **Image Path:** `/GuessTheCountry/{CountryName}.png`

### CAPITALS Mode

-   **Question:** User sees country outline or info
-   **Answer:** Capital city name (string)
-   **Scoring:** 1 point for correct, 0 for incorrect
-   **Image Path:** `/GuessTheCapital/{CountryName}.png`

### SIGHTS Mode (Distance-Based Scoring)

-   **Question:** User sees landmark image
-   **Answer:** Latitude and longitude coordinates
-   **Scoring:** Based on distance from correct location
-   **Image Path:** `/GuessTheLandmark/{LandmarkName}.jpg`

#### Sights Mode Scoring Table:

| Distance (km) | Points |
| ------------- | ------ |
| 0 - 50        | 1000   |
| 51 - 100      | 800    |
| 101 - 200     | 600    |
| 201 - 500     | 400    |
| 501 - 1000    | 200    |
| 1001 - 2000   | 100    |
| 2000+         | 0      |

---

## Game Formats

### CLASSIC Mode

-   Fixed 10 questions
-   Game ends after question #10
-   `gameOver` becomes `true` in response

### ENDLESS Mode

-   No question limit
-   `gameOver` always `false`
-   Game continues until user ends session

---

## Game Flow

1. **Create Session** → `POST /api/sessions`

    - Returns `sessionId`
    - Session initialized with score=0, questionNumber=0

2. **Start Game** → `POST /api/game/start/{sessionId}`

    - Generates first question
    - Returns image URL and prompt
    - Sets questionNumber=1

3. **Submit Guess** → `POST /api/game/guess`

    - Validates answer
    - Updates score
    - Increments question number
    - Generates next question (if not game over)
    - Returns result + next question info

4. **Repeat Step 3** until game over (classic mode) or user ends session

5. **End Session** → `DELETE /api/sessions/{sessionId}`
    - Cleans up session from Redis

---

## Answer Validation

### Text-Based (FLAGS & CAPITALS)

-   Case-insensitive comparison
-   Whitespace trimmed
-   Exact match required

### Coordinate-Based (SIGHTS)

-   Uses Haversine formula to calculate distance
-   Considers Earth's radius (6371 km)
-   Points awarded based on distance thresholds

---

## Data Sources

### CountriesData.java

-   51 European countries
-   Used for FLAGS mode
-   Contains country center coordinates

### CapitalsData.java

-   51 European capitals
-   Used for CAPITALS mode
-   Contains capital city coordinates

### LandmarksData.java

-   Famous European landmarks
-   Used for SIGHTS mode
-   Contains precise landmark coordinates

---

## Testing with Postman

### 1. Create Session

```http
POST http://localhost:8080/api/sessions
Content-Type: application/json

{
  "gameMode": "flags",
  "format": "classic"
}
```

Save the returned `sessionId`.

### 2. Start Game

```http
POST http://localhost:8080/api/game/start/{sessionId}
```

### 3. Submit Guess (FLAGS)

```http
POST http://localhost:8080/api/game/guess
Content-Type: application/json

{
  "sessionId": "your-session-id",
  "guess": "France"
}
```

### 4. Submit Guess (SIGHTS)

```http
POST http://localhost:8080/api/game/guess
Content-Type: application/json

{
  "sessionId": "your-session-id",
  "lat": 48.8584,
  "lon": 2.2945
}
```

---

## Error Handling

### 400 Bad Request

-   Invalid session ID
-   Missing required fields (sessionId, guess/coordinates)
-   No active question in session
-   Invalid game state

### 500 Internal Server Error

-   Unexpected server errors
-   Redis connection issues

---

## Key Components

### GameLogicService

-   Core business logic
-   Answer validation
-   Score calculation
-   Question generation

### GameController

-   REST API endpoints
-   Request/response handling
-   Error handling

### DTOs

-   `GuessRequest`: User's guess submission
-   `GuessResponse`: Result and next question info

### Models

-   `GameSession`: Session state in Redis
-   `Answer`: Correct answer structure

---

## Future Enhancements

1. **Adjustable Difficulty**

    - Easy: More forgiving distance thresholds
    - Hard: Stricter validation

2. **Hints System**

    - Allow users to request hints
    - Deduct points for hint usage

3. **Multiplayer**

    - Real-time competitive mode
    - Leaderboards

4. **Statistics**

    - Track user performance over time
    - Average scores, accuracy, etc.

5. **Custom Scoring**
    - Configurable point thresholds
    - Time-based bonuses
