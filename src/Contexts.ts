import { createContext } from "react";

const SCREENS: { [key: string]: string } = {
    SETUP: "setup",
    DRINK: "drink",
};

const MENUS: {
    [key: string]: {
        category: string;
        color: string;
        border: string;
        text: string;
    };
} = {
    WETHERSPOONS: {
        category: "wetherspoons",
        color: "#f43f5e",
        border: "border-cyan-500",
        text: "text-cyan-500",
    },
    COCKTAILS: {
        category: "cocktails",
        color: "#f59e0b",
        border: "border-yellow-500",
        text: "text-yellow-500",
    },
    SHOTS: {
        category: "shots",
        color: "#84cc16",
        border: "border-purple-500",
        text: "text-purple-500",
    },
    GROSS: {
        category: "gross",
        color: "#a78bfa",
        border: "border-green-500",
        text: "text-green-500",
    },
    CHEAP: {
        category: "cheap",
        color: "#06b6d4",
        border: "border-pink-500",
        text: "text-pink-500",
    },
};

const GameContext = createContext<{
    gameState: string;
    setGameState: (state: string) => void;
    players: string[];
    setPlayers: (players: string[]) => void;
    menus: string[];
    setMenus: (menus: string[]) => void;
}>({
    gameState: SCREENS.SETUP,
    setGameState: () => {},
    players: [],
    setPlayers: () => {},
    menus: [],
    setMenus: () => {},
});

export { GameContext, SCREENS, MENUS };
