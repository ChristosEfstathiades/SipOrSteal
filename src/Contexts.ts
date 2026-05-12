import { createContext } from "react";

const SCREENS: { [key: string]: string } = {
    SETUP: "setup",
    DRINK: "drink",
    QUESTIONS: "questions",
    STEAL: "steal",
    SCORES: "scores",
};

const GameContext = createContext<{
    gameState: string;
    setGameState: (state: string) => void;
    players: string[];
    setPlayers: (players: string[]) => void;
}>({
    gameState: SCREENS.SETUP,
    setGameState: () => {},
    players: [],
    setPlayers: () => {},
});

export { GameContext, SCREENS };
