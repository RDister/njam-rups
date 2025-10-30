import { create } from "zustand";

interface ModalState {
  currentGame: string;
  setGameModal: (game: string) => void;
}

export const useModalState = create<ModalState>()((set) => ({
  currentGame: "",
  setGameModal: (game) => set({ currentGame: game }),
}));
