import "./App.css";
import Home from "./pages/Home";
import { useLocalStorage } from "usehooks-ts";
import { GameContext, SCREENS } from "./Contexts";
import Navigation from "./components/Navigation";
import CustomDrinks from "./pages/CustomDrinks";
import Gameplay from "./pages/Gameplay";

function App() {
    const [gameState, setGameState] = useLocalStorage<string>(
        "gameState",
        SCREENS.SETUP,
    );

    const [players, setPlayers] = useLocalStorage<string[]>("players", []);

    const [menus, setMenus] = useLocalStorage<string[]>("menus", []);

    const [drinks, setDrinks] = useLocalStorage<string[]>("drinks", []);

    return (
        <>
            <GameContext
                value={{
                    gameState,
                    setGameState,
                    players,
                    setPlayers,
                    menus,
                    setMenus,
                    drinks,
                    setDrinks,
                }}
            >
                <Navigation />
                <main className="sm:max-w-md max-w-xs  mx-auto">
                    {gameState == SCREENS.SETUP && <Home />}
                    {gameState == SCREENS.DRINK && <CustomDrinks />}
                    {gameState == SCREENS.GAMEPLAY && <Gameplay />}
                </main>
            </GameContext>
        </>
    );
}

export default App;
