interface CorrectAnswer {
	name: string;
	country: string;
	lat: string;
	lon: string;
}

export type GameMode = "flags" | "capitals" | "sights";

export type GameFormat = "classic" | "endless";

export interface GameStart {
	sessionId: string;
	correct: boolean;
	answer: CorrectAnswer;
	pointsEarned: number;
	score: number;
	questionNumber: number;
	gameOver: boolean;
	nextImageUrl: string;
	distanceKm: number;
	distanceDescription: string;
}

export type GameGuess = GameStart;
