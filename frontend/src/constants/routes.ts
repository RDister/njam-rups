export const Routes = {
	HOME: "/",
	GUESS_THE_COUNTRY: "/games/guessTheCountry",
	GUESS_THE_CAPITAL: "/games/guessTheCapital",
	GUESS_THE_LANDMARK: "/games/guessTheLandmark",
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];

export const ApiRoutes = {
	test: () => `/api/test` as const,
	gameStart: () => `/api/api/game/start` as const,
	gameEnd: ({ sessionId }: { sessionId: string }) =>
		`/api/api/game/end/${sessionId}` as const,
	gameGuess: () => `/api/api/game/guess` as const,
} as const;
