import { useContext } from "react";
import { GameContext, SCREENS } from "../Contexts";
import PlayerSelection from "../components/PlayerSelection";

export default function Home() {
    const { setGameState } = useContext(GameContext);

    return (
        <div className="">
            <h1 className="text-4xl font-bold text-center">Sip Or Steal</h1>

            <PlayerSelection />

            <button
                onClick={() => {
                    setGameState(SCREENS.DRINK);
                }}
            >
                Start Game
            </button>
        </div>
    );
}
