export const Routes = {
	HOME: "/",
	GUESS_THE_COUNTRY: "/games/guessTheCountry",
	GUESS_THE_CAPITAL: "/games/guessTheCapital",
	GUESS_THE_LANDMARK: "/games/guessTheLandmark",
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
