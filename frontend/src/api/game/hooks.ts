import { useMutation } from "@tanstack/react-query";
import { gameEnd, gameGuess, gameStart } from ".";

export const useGameStart = () => {
	return useMutation({
		mutationFn: gameStart,
		onSuccess: (data) => {
			console.log("Game started successfully:", data);
		},
	});
};

export const useGameEnd = () => {
	return useMutation({
		mutationFn: gameEnd,
		onSuccess: (data) => {
			console.log("Game ended successfully:", data);
		},
	});
};

export const useGameGuess = () => {
	return useMutation({
		mutationFn: gameGuess,
	});
};
