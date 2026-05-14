import { useContext, useState } from "react";
import { GameContext, SCREENS } from "../Contexts";

export default function CustomDrinks() {
    const { players, drinks, setDrinks, setGameState } =
        useContext(GameContext);
    const [drinkName, setDrinkName] = useState("");
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    const handleNext = () => {
        if (drinkName.trim() === "") return;

        const newDrinks = [...drinks, drinkName];
        setDrinks(newDrinks);
        setDrinkName("");

        // Check if all players have entered drinks
        if (currentPlayerIndex === players.length - 1) {
            // All players done, move to gameplay
            setGameState(SCREENS.GAMEPLAY);
        } else {
            // Move to next player
            setCurrentPlayerIndex(currentPlayerIndex + 1);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleNext();
        }
    };

    const currentPlayer = players[currentPlayerIndex];
    const progressText = `${currentPlayerIndex + 1} / ${players.length}`;

    return (
        <div className="flex flex-col items-center justify-center gap-y-8 min-h-screen">
            <h1 className="text-4xl font-bold text-center">Custom Drinks</h1>

            <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">{progressText}</p>
                <p className="text-2xl font-semibold capitalize">
                    {currentPlayer}'s Turn
                </p>
            </div>

            <div className="w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Enter drink name"
                    value={drinkName}
                    onChange={(e) => setDrinkName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 text-lg"
                    autoFocus
                />
            </div>

            <button
                onClick={handleNext}
                disabled={drinkName.trim() === ""}
                className="text-white text-xl cursor-pointer font-medium capitalize bg-green-700 border-2 border-black/15 py-3 px-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
                Next
            </button>
        </div>
    );
}
