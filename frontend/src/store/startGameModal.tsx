import { create } from "zustand";

export type GameType = "country" | "city" | "landmark";

interface ModalState {
	currentGame: GameType;
	setGameModal: (game: GameType) => void;
}

export const useModalState = create<ModalState>()((set) => ({
	currentGame: "country",
	setGameModal: (game) => set({ currentGame: game }),
}));
