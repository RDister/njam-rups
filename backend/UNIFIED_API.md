# Unified Game API

## Overview

All game functionality is now consolidated into a single **`GameSessionController`** at `/api/game`. This provides a cleaner, more intuitive API structure.

## API Endpoints

### 1. Start a New Game

**POST** `/api/game/start`

Creates a session and immediately starts the game with the first question.

**Request:**

```json
{
    "gameMode": "flags", // or "capitals" or "sights"
    "format": "classic" // or "endless"
}
```

**Response:**

```json
{
    "sessionId": "uuid-string",
    "gameMode": "flags",
    "format": "classic",
    "score": 0,
    "questionNumber": 1,
    "gameOver": false,
    "nextImageUrl": "/GuessTheCountry/France.png",
    "correct": null, // First question - no previous answer
    "correctAnswer": null, // First question - no previous answer
    "pointsEarned": null // First question - no previous answer
}
```

---

### 2. Submit Guess (FLAGS/CAPITALS)

**POST** `/api/game/guess`

**Request:**

```json
{
    "sessionId": "uuid-string",
    "guess": "France"
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
    "score": 5,
    "questionNumber": 6,
    "gameOver": false,
    "nextImageUrl": "/GuessTheCountry/Germany.png"
}
```

---

### 3. Submit Guess (SIGHTS)

**POST** `/api/game/guess/sights`

**Request:**

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
        "name": "Eiffel Tower",
        "country": "France",
        "lat": 48.8584,
        "lon": 2.2945
    },
    "pointsEarned": 1000,
    "score": 3200,
    "questionNumber": 4,
    "gameOver": false,
    "nextImageUrl": "/GuessTheLandmark/Colosseum.jpg",
    "distanceKm": 12.5,
    "distanceDescription": "Perfect! Almost exact!"
}
```

---

### 4. Get Session Info

**GET** `/api/game/session/{sessionId}`

**Response:**

```json
{
    "sessionId": "uuid-string",
    "gameMode": "flags",
    "format": "classic",
    "createdAt": "2025-11-02T10:30:00",
    "lastActivityAt": "2025-11-02T10:35:00",
    "questionNumber": 5,
    "score": 4
}
```

---

### 5. End Game

**DELETE** `/api/game/end/{sessionId}`

**Response:**

```json
{
    "message": "Game ended successfully",
    "sessionId": "uuid-string"
}
```

---

### 6. Check Session Exists

**HEAD** `/api/game/session/{sessionId}`

**Response:**

-   `200 OK` - Session exists
-   `404 Not Found` - Session doesn't exist or expired

---

## Game Flow

### Simple 3-Step Flow:

1. **Start Game**

    ```
    POST /api/game/start
    → Get sessionId + first question
    ```

2. **Play** (repeat until gameOver)

    ```
    POST /api/game/guess (or /guess/sights)
    → Get result + next question
    ```

3. **End Game** (optional)
    ```
    DELETE /api/game/end/{sessionId}
    → Clean up session
    ```

---

## Key Changes from Previous Structure

### Before (2 Controllers):

```
/api/sessions          (GameSessionController)
  POST /                     - Create session
  GET /{id}                  - Get session info
  DELETE /{id}               - Delete session
  HEAD /{id}                 - Check exists

/api/game              (GameController)
  POST /start/{id}           - Start game
  POST /guess                - Submit guess
  POST /guess/sights         - Submit sights guess
```

### After (1 Controller):

```
/api/game              (GameSessionController)
  POST /start                - Create session + start game
  POST /guess                - Submit guess
  POST /guess/sights         - Submit sights guess
  GET /session/{id}          - Get session info
  DELETE /end/{id}           - End game
  HEAD /session/{id}         - Check exists
```

---

## Benefits

### 1. **Single Source of Truth**

-   All game logic in one place
-   No confusion about which controller to use
-   Easier to maintain and understand

### 2. **Simpler Flow**

-   Start game immediately with one call
-   No separate "create session" then "start game" steps
-   First question returned right away

### 3. **Better REST Design**

-   `/api/game` represents the game resource
-   All game-related operations under one path
-   More intuitive URL structure

### 4. **Cleaner Frontend Integration**

```typescript
// Old way (2 API calls):
const session = await createSession(gameMode, format);
const firstQuestion = await startGame(session.id);

// New way (1 API call):
const game = await startGame(gameMode, format);
// Already have sessionId + first question!
```

### 5. **Reduced Boilerplate**

-   One controller to test
-   One set of error handling
-   One place to add features

---

## Migration Guide

### If you were using the old endpoints:

**Old:**

```javascript
// Step 1: Create session
POST /api/sessions
{ "gameMode": "flags", "format": "classic" }
→ Get sessionId

// Step 2: Start game
POST /api/game/start/{sessionId}
→ Get first question
```

**New:**

```javascript
// Single step: Start game
POST /api/game/start
{ "gameMode": "flags", "format": "classic" }
→ Get sessionId + first question in one response
```

---

## Testing with Postman

### Complete Game Session:

1. **Start:**

```http
POST http://localhost:8080/api/game/start
Content-Type: application/json

{
  "gameMode": "flags",
  "format": "classic"
}
```

2. **Play:**

```http
POST http://localhost:8080/api/game/guess
Content-Type: application/json

{
  "sessionId": "your-session-id-here",
  "guess": "France"
}
```

3. **End:**

```http
DELETE http://localhost:8080/api/game/end/your-session-id-here
```

---

## Notes

-   **First Question Response:** `correct`, `correctAnswer`, and `pointsEarned` will be `null` since there's no previous guess
-   **Session Expiry:** Still 10 minutes of inactivity (TTL in Redis)
-   **Auto-Cleanup:** Redis automatically removes expired sessions
-   **Game Modes:** All three modes (flags, capitals, sights) work the same way
-   **Classic Mode:** Game ends after 10 questions (`gameOver: true`)
-   **Endless Mode:** Game never ends (`gameOver: false`)
