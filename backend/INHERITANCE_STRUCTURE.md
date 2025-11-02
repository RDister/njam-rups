# Inheritance-Based DTO Structure for Game Modes

## Overview

The guessing system now uses inheritance to cleanly separate FLAGS/CAPITALS modes from SIGHTS mode, providing type safety and clearer API contracts.

## Class Hierarchy

### Request DTOs

```
GuessRequest (base class)
├── Used for: FLAGS and CAPITALS modes
├── Fields: sessionId, guess (text)
└── SightsGuessRequest (extends GuessRequest)
    ├── Used for: SIGHTS mode
    └── Additional fields: lat, lon (coordinates)
```

### Response DTOs

```
GuessResponse (base class)
├── Used for: FLAGS and CAPITALS modes
├── Fields: correct, correctAnswer, pointsEarned, score,
│           questionNumber, gameOver, nextImageUrl
└── SightsGuessResponse (extends GuessResponse)
    ├── Used for: SIGHTS mode
    └── Additional fields: distanceKm, distanceDescription
```

## API Endpoints

### 1. FLAGS & CAPITALS Modes

**POST** `/api/game/guess`

**Request:**

```json
{
    "sessionId": "uuid-string",
    "guess": "France"
}
```

**Response (GuessResponse):**

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

### 2. SIGHTS Mode

**POST** `/api/game/guess/sights`

**Request (SightsGuessRequest):**

```json
{
    "sessionId": "uuid-string",
    "lat": 48.8584,
    "lon": 2.2945
}
```

**Response (SightsGuessResponse):**

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

## Distance Descriptions (SIGHTS Mode)

| Distance (km) | Description                 |
| ------------- | --------------------------- |
| 0 - 50        | "Perfect! Almost exact!"    |
| 51 - 100      | "Very close!"               |
| 101 - 200     | "Pretty good!"              |
| 201 - 500     | "Not bad!"                  |
| 501 - 1000    | "Getting warmer..."         |
| 1001 - 2000   | "Too far, but you tried!"   |
| 2000+         | "Way off! Keep practicing!" |

## Benefits of Inheritance Approach

### 1. **Type Safety**

-   Compiler enforces that SIGHTS requests have lat/lon
-   Impossible to submit coordinates for FLAGS/CAPITALS modes
-   Clear separation of concerns

### 2. **Cleaner API**

-   Different endpoints for different request types
-   No nullable fields that "might" be used
-   Self-documenting structure

### 3. **Validation**

```java
// SightsGuessRequest automatically validates:
@NotNull(message = "Latitude is required for sights mode")
private Double lat;

@NotNull(message = "Longitude is required for sights mode")
private Double lon;
```

### 4. **Maintainability**

-   Easy to add mode-specific fields
-   Changes to one mode don't affect others
-   Clear inheritance hierarchy

### 5. **Better Frontend Integration**

Frontend can use different request/response types:

```typescript
// TypeScript example
interface GuessRequest {
    sessionId: string;
    guess: string;
}

interface SightsGuessRequest extends GuessRequest {
    lat: number;
    lon: number;
}
```

## Service Layer

### GameLogicService Methods

**For FLAGS/CAPITALS:**

```java
public GuessResponse processGuess(GuessRequest request)
```

**For SIGHTS:**

```java
public SightsGuessResponse processSightsGuess(SightsGuessRequest request)
```

This separation ensures:

-   Type-safe handling of different modes
-   No runtime checks for "which mode is this?"
-   Clear method signatures

## Lombok Annotations Used

### @SuperBuilder

Enables builder pattern with inheritance:

```java
SightsGuessRequest request = SightsGuessRequest.builder()
    .sessionId("uuid")
    .lat(48.8584)
    .lon(2.2945)
    .build();
```

### @EqualsAndHashCode(callSuper = true)

Ensures proper equality checking including parent class fields.

## Example Usage Flow

### FLAGS/CAPITALS Mode:

1. Create session → `POST /api/sessions`
2. Start game → `POST /api/game/start/{sessionId}`
3. Submit guess → `POST /api/game/guess` with `GuessRequest`
4. Receive `GuessResponse` with next question

### SIGHTS Mode:

1. Create session → `POST /api/sessions`
2. Start game → `POST /api/game/start/{sessionId}`
3. Submit guess → `POST /api/game/guess/sights` with `SightsGuessRequest`
4. Receive `SightsGuessResponse` with distance info and next question

## Migration Notes

### Before (Mixed Approach):

```java
public class GuessRequest {
    private String guess;        // For FLAGS/CAPITALS
    private Double lat;          // For SIGHTS (nullable)
    private Double lon;          // For SIGHTS (nullable)
}
```

### After (Inheritance):

```java
public class GuessRequest {
    private String guess;        // Clean, no nullables
}

public class SightsGuessRequest extends GuessRequest {
    @NotNull private Double lat;  // Always required
    @NotNull private Double lon;  // Always required
}
```

## Validation Advantages

**Old way:**

```java
if (mode.equals("sights") && (lat == null || lon == null)) {
    throw new IllegalArgumentException("Coords required");
}
```

**New way:**

-   Validation handled automatically by `@NotNull`
-   Separate endpoints prevent wrong request type
-   Compiler enforces correctness

## Future Extensibility

Easy to add new game modes:

```java
public class NewModeGuessRequest extends GuessRequest {
    private String additionalField;
}

public class NewModeGuessResponse extends GuessResponse {
    private String modeSpecificData;
}
```

## Testing Benefits

Separate types make testing clearer:

```java
@Test
void testFlagsGuess() {
    GuessRequest request = GuessRequest.builder()
        .sessionId("test")
        .guess("France")
        .build();
    // Test FLAGS logic
}

@Test
void testSightsGuess() {
    SightsGuessRequest request = SightsGuessRequest.builder()
        .sessionId("test")
        .lat(48.8584)
        .lon(2.2945)
        .build();
    // Test SIGHTS logic
}
```
