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
}>({
    gameState: SCREENS.SETUP,
    setGameState: () => {},
});

export { GameContext, SCREENS };
