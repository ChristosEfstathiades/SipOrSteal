import { useContext } from "react";
import { GameContext, SCREENS } from "../Contexts";
import PlayerSelection from "../components/PlayerSelection";
import MenuSelection from "../components/MenuSelection";

export default function Home() {
    const { setGameState } = useContext(GameContext);

    return (
        <div className="flex flex-col items-center justify-center gap-y-8">
            <h1 className="text-4xl font-bold text-center">Sip Or Steal</h1>

            <PlayerSelection />
            <MenuSelection />

            <button
                className="text-white text-2xl cursor-pointer font-medium capitalize bg-green-700 border border-black/15 py-4 px-12 rounded-xl"
                onClick={() => {
                    setGameState(SCREENS.DRINK);
                }}
            >
                Start Game
            </button>
        </div>
    );
}
