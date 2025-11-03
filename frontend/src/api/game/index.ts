import { ApiRoutes } from "@/constants/routes";
import { instance } from "../axios";
import {
	GameFormat,
	GameGuess,
	GameMode,
	GameStart,
} from "../models/game/GameModel";

export const gameStart = async ({
	gameMode,
	format,
}: {
	gameMode: GameMode;
	format: GameFormat;
}) => {
	const response = await instance.post<GameStart>(ApiRoutes.gameStart(), {
		gameMode,
		format,
	});

	return response?.data;
};

export const gameEnd = async (sessionId: string) => {
	const response = await instance.delete(ApiRoutes.gameEnd({ sessionId }));

	return response?.data;
};

export const gameGuess = async ({
	sessionId,
	guess,
	lat,
	lon,
}: {
	sessionId: string;
	guess?: string;
	lat?: number;
	lon?: number;
}) => {
	const response = await instance.post<GameGuess>(ApiRoutes.gameGuess(), {
		sessionId,
		guess,
		lat,
		lon,
	});

	return response?.data;
};

export const sightsGameGuess = async ({
	sessionId,
	guess,
	lat,
	lon,
}: {
	sessionId: string;
	guess?: string;
	lat?: number;
	lon?: number;
}) => {
	const response = await instance.post<GameGuess>(ApiRoutes.sightsGameGuess(), {
		sessionId,
		guess,
		lat,
		lon,
	});

	return response?.data;
};
