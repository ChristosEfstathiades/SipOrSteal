import { GameContext } from "../Contexts";
import { useContext } from "react";
import { X } from "lucide-react";

export default function PlayerSelection() {
    const { players, setPlayers } = useContext(GameContext);

    return (
        <>
            <div className="flex flex-col gap-y-4">
                <h2 className="text-center text-xl">Add Players</h2>
                <form
                    className="flex flex-row gap-x-3 justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const playerName = (
                            document.getElementsByName(
                                "playerName",
                            )[0] as HTMLInputElement
                        ).value;
                        if (playerName) {
                            setPlayers([...players, playerName]);
                            (
                                document.getElementsByName(
                                    "playerName",
                                )[0] as HTMLInputElement
                            ).value = "";
                        }
                    }}
                >
                    <input
                        type="text"
                        className="bg-[#1a1a2e] rounded-xl border-white/15 border text-white px-4 py-3 outline-0"
                        name="playerName"
                    />
                    <button
                        type="submit"
                        className="bg-accent text-white rounded-xl px-4 py-1 font-medium flex self-center"
                    >
                        ADD
                    </button>
                </form>
                <div className="flex flex-row gap-3 flex-wrap">
                    {players.map((player, index) => (
                        <div
                            key={index}
                            className="bg-white/85 rounded-xl border-black/15 border flex gap-x-2 py-1 px-1.5"
                        >
                            <p className="text-black/70 flex items-center">
                                {player}
                            </p>
                            <button
                                onClick={() => {
                                    setPlayers(
                                        players.filter((_, i) => i !== index),
                                    );
                                }}
                                className=" text-[#F43F5E] font-medium cursor-pointer "
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
