import { GameContext, SCREENS } from "../Contexts";
import { useContext } from "react";

export default function Gameplay() {
    const {} = useContext(GameContext);

    return (
        <>

            <div className="flex flex-row justify-around">
                <button className="text-white text-2xl cursor-pointer font-medium capitalize bg-red-700 border-2 border-black/15 py-4 px-12 rounded-xl">Steal</button>
                <button className="text-white text-2xl cursor-pointer font-medium capitalize bg-green-700 border-2 border-black/15 py-4 px-12 rounded-xl">Leave</button>
            </div>
            <div>
                <h2>Suggested Questions:</h2>
            </div>
        </>
    );
}
