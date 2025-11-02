# Game Session Management with Redis

This document explains how the Redis-based session management works for the guessing game.

## Overview

Sessions are stored in **Redis** with automatic expiration after **10 minutes of inactivity**. This ensures:

-   Fast session access (in-memory storage)
-   Automatic cleanup of inactive sessions
-   Stateless backend (sessions not stored in database)
-   Scalable architecture

## Game Modes

The game supports 3 modes:

-   **flags** - Guess the country by its flag
-   **capitals** - Guess the capital city
-   **sights** - Guess the landmark/sight

## Game Formats

-   **classic** - Fixed number of questions
-   **endless** - Continuous play until player quits

## API Endpoints

### 1. Create Session

**POST** `/api/sessions`

Creates a new game session.

**Request Body:**

```json
{
    "gameMode": "flags", // or "capitals", "sights"
    "format": "classic" // or "endless"
}
```

**Response (201 Created):**

```json
{
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "gameMode": "flags",
    "format": "classic",
    "createdAt": "2025-11-02T10:30:00",
    "questionNumber": 1,
    "score": 0,
    "message": "Session created successfully. Will expire after 10 minutes of inactivity."
}
```

**Error Response (400 Bad Request):**

```json
{
    "error": "Invalid game mode: xyz. Must be one of: [flags, capitals, sights]"
}
```

---

### 2. Get Session Info

**GET** `/api/sessions/{sessionId}`

Retrieves current session state. Also refreshes the session TTL.

**Response (200 OK):**

```json
{
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "gameMode": "flags",
    "format": "classic",
    "createdAt": "2025-11-02T10:30:00",
    "lastActivityAt": "2025-11-02T10:35:22",
    "questionNumber": 5,
    "score": 300
}
```

**Error Response (404 Not Found):**

```json
{
    "error": "Session not found or expired: 123e4567-e89b-12d3-a456-426614174000"
}
```

---

### 3. End Session

**DELETE** `/api/sessions/{sessionId}`

Manually ends a session (removes from Redis).

**Response (200 OK):**

```json
{
    "message": "Session ended successfully",
    "sessionId": "123e4567-e89b-12d3-a456-426614174000"
}
```

---

### 4. Check Session Exists

**HEAD** `/api/sessions/{sessionId}`

Quick check if session is valid.

**Response:**

-   `200 OK` - Session exists
-   `404 Not Found` - Session doesn't exist or expired

---

## Session Lifecycle

```
1. Frontend sends POST /api/sessions
   ↓
2. Backend creates session in Redis with 10min TTL
   ↓
3. Frontend receives sessionId
   ↓
4. Frontend makes game requests with sessionId
   ↓
5. Each request refreshes the 10min TTL
   ↓
6. Session expires after 10min of no activity
   OR
   Frontend sends DELETE /api/sessions/{sessionId}
```

## How TTL (Time To Live) Works

-   **Initial Creation**: Session created with 600 seconds (10 minutes) TTL
-   **On Each Access**: `getSession()` updates `lastActivityAt` and resets TTL to 600 seconds
-   **Automatic Deletion**: After 10 minutes of no activity, Redis automatically deletes the session
-   **Manual Deletion**: Frontend can call DELETE endpoint to end session immediately

## Redis Setup

### Local Development

1. **Install Redis**:

    - Windows: Use [Redis for Windows](https://github.com/microsoftarchive/redis/releases) or WSL
    - Mac: `brew install redis`
    - Linux: `sudo apt-get install redis-server`

2. **Start Redis**:

    ```bash
    redis-server
    ```

3. **Verify Redis is running**:
    ```bash
    redis-cli ping
    # Should return: PONG
    ```

### Configuration

In `application.properties`:

```properties
spring.data.redis.host=localhost
spring.data.redis.port=6379
# spring.data.redis.password=your-password  # if authentication enabled
```

## Code Structure

```
backend/src/main/java/com/njam/rups_geography_backend/
├── config/
│   └── RedisConfig.java              # Redis connection configuration
├── models/
│   └── GameSession.java              # Session entity with @RedisHash
├── repositories/
│   └── GameSessionRepository.java    # Spring Data Redis repository
├── services/
│   └── GameSessionService.java       # Business logic for sessions
└── controllers/
    └── GameSessionController.java    # REST endpoints
```

## Key Classes

### GameSession Model

```java
@RedisHash("game_sessions")
public class GameSession {
    @Id
    private String id;              // UUID
    private String gameMode;        // flags/capitals/sights
    private String format;          // classic/endless

    @TimeToLive
    private Long ttl = 600L;        // 10 minutes

    // Game state (for future use)
    private Integer currentQuestionNumber;
    private Integer score;
    // ... more fields as needed
}
```

### GameSessionService

-   `createSession(gameMode, format)` - Create new session
-   `getSession(sessionId)` - Get and refresh session
-   `endSession(sessionId)` - Delete session
-   `sessionExists(sessionId)` - Check if valid

## Testing with cURL

### Create Session

```bash
curl -X POST http://localhost:8080/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"gameMode": "flags", "format": "classic"}'
```

### Get Session

```bash
curl http://localhost:8080/api/sessions/{sessionId}
```

### End Session

```bash
curl -X DELETE http://localhost:8080/api/sessions/{sessionId}
```

### Check Session

```bash
curl -I http://localhost:8080/api/sessions/{sessionId}
```

## Frontend Integration Example

```typescript
// Create session
const response = await fetch("http://localhost:8080/api/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        gameMode: "flags",
        format: "classic",
    }),
});

const { sessionId } = await response.json();
localStorage.setItem("sessionId", sessionId);

// Get session info
const sessionId = localStorage.getItem("sessionId");
const sessionData = await fetch(`http://localhost:8080/api/sessions/${sessionId}`);

// End session
await fetch(`http://localhost:8080/api/sessions/${sessionId}`, {
    method: "DELETE",
});
localStorage.removeItem("sessionId");
```

## Future Enhancements

When you're ready to add game logic:

1. Add question/answer fields to `GameSession`
2. Create new endpoints for submitting guesses
3. Implement scoring logic in `GameSessionService`
4. Add question generation service
5. Track game statistics in PostgreSQL

## Troubleshooting

### Redis Connection Issues

```
Error: Unable to connect to Redis at localhost:6379
```

**Solution**: Make sure Redis is running: `redis-server`

### Session Not Found

```
Error: Session not found or expired
```

**Solution**: Session may have expired (10 min timeout) or invalid sessionId

### Build Errors

```
Error: Could not autowire GameSessionRepository
```

**Solution**: Run `mvn clean install` to download Redis dependencies

## Security Notes

-   Session IDs are UUIDs (hard to guess)
-   No sensitive data stored in Redis (just game state)
-   Consider adding rate limiting for session creation
-   In production, secure Redis with password and TLS
