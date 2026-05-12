import "./App.css";
import Home from "./pages/Home";
import { useLocalStorage } from "usehooks-ts";
import { GameContext, SCREENS } from "./Contexts";
import Navigation from "./components/Navigation";

function App() {
    const [gameState, setGameState] = useLocalStorage<string>(
        "gameState",
        SCREENS.SETUP,
    );

    const [players, setPlayers] = useLocalStorage<string[]>("players", []);

    const [menus, setMenus] = useLocalStorage<string[]>("menus", []);

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
                }}
            >
                <Navigation />
                <main className="sm:max-w-md max-w-xs  mx-auto">
                    {gameState == SCREENS.SETUP && <Home />}
                    {gameState == SCREENS.DRINK && <div>Drink screen</div>}
                </main>
            </GameContext>
        </>
    );
}

export default App;
