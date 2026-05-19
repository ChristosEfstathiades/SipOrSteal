import { useContext, useState } from "react";
import { GameContext, SCREENS } from "../Contexts";
import { buildRound, pickRandomDrink, type RoundData } from "../utils/gameplay";

type Phase =
    | "round-intro"
    | "pass-to-revealer"
    | "pre-reveal"
    | "revealed"
    | "pass-to-questioner"
    | "questioning"
    | "pair-result"
    | "round-summary"
    | "sole-survivor"
    | "game-over";

interface PairResult {
    revealer: string;
    questioner: string;
    drink: string;
    stolen: boolean;
}

const screen =
    "min-h-screen flex flex-col items-center justify-center gap-y-8 px-6 py-10";
const card =
    "bg-white/5 border border-white/10 rounded-2xl p-6 w-full text-center";
const primaryBtn =
    "w-full py-4 rounded-xl text-xl font-bold text-white cursor-pointer transition-transform active:scale-95 bg-purple-600 hover:bg-purple-500";
const secondaryBtn =
    "w-full py-4 rounded-xl text-xl font-bold text-white cursor-pointer transition-transform active:scale-95 bg-white/10 hover:bg-white/20";

export default function Gameplay() {
    const { players, drinks, setGameState, setDrinks } =
        useContext(GameContext);

    const initialPlayers = players.length > 0 ? players : [];
    const initialPool = drinks.length > 0 ? [...drinks] : [];

    const [phase, setPhase] = useState<Phase>("round-intro");
    const [roundNum, setRoundNum] = useState(1);
    const [drinkPool, setDrinkPool] = useState<string[]>(initialPool);
    const [roundData, setRoundData] = useState<RoundData>(() =>
        buildRound(initialPlayers, initialPool),
    );
    const [pairIndex, setPairIndex] = useState(0);
    const [assignedDrinks, setAssignedDrinks] = useState<
        Record<string, string>
    >({});
    const [roundResults, setRoundResults] = useState<PairResult[]>([]);
    const [lastResult, setLastResult] = useState<PairResult | null>(null);
    const [soloPlayer, setSoloPlayer] = useState<string | null>(null);
    const [soloDrink, setSoloDrink] = useState<string | null>(null);

    const currentPair = roundData.pairs[pairIndex];

    function handleDecision(stolen: boolean) {
        if (!currentPair) return;
        const result: PairResult = {
            revealer: currentPair.revealer,
            questioner: currentPair.questioner,
            drink: currentPair.drink,
            stolen,
        };
        const drinker = stolen ? currentPair.questioner : currentPair.revealer;
        setAssignedDrinks((prev) => ({ ...prev, [drinker]: currentPair.drink }));
        setRoundResults((prev) => [...prev, result]);
        setLastResult(result);
        setPhase("pair-result");
    }

    function advanceFromPairResult() {
        if (pairIndex + 1 < roundData.pairs.length) {
            setPairIndex((p) => p + 1);
            setPhase("pass-to-revealer");
        } else {
            setPhase("round-summary");
        }
    }

    function advanceRound() {
        const survivors = roundResults.map((r) =>
            r.stolen ? r.revealer : r.questioner,
        );
        if (roundData.sittingOut) survivors.push(roundData.sittingOut);

        const usedDrinks = roundResults.map((r) => r.drink);
        const newPool = [...drinkPool];
        for (const d of usedDrinks) {
            const idx = newPool.indexOf(d);
            if (idx !== -1) newPool.splice(idx, 1);
        }

        setDrinkPool(newPool);
        setRoundResults([]);

        if (survivors.length === 0) {
            setPhase("game-over");
        } else if (survivors.length === 1) {
            const finalDrink = pickRandomDrink(newPool);
            setAssignedDrinks((prev) => ({
                ...prev,
                [survivors[0]]: finalDrink,
            }));
            setSoloPlayer(survivors[0]);
            setSoloDrink(finalDrink);
            setPhase("sole-survivor");
        } else {
            const newRound = buildRound(survivors, newPool);
            setRoundData(newRound);
            setPairIndex(0);
            setRoundNum((n) => n + 1);
            setPhase("round-intro");
        }
    }

    function restartGame() {
        setDrinks([]);
        setGameState(SCREENS.SETUP);
    }

    // ── round-intro ──────────────────────────────────────────────────────────
    if (phase === "round-intro") {
        return (
            <div className={screen}>
                <div className="text-center">
                    <p className="text-gray-400 uppercase tracking-widest text-sm">
                        Round
                    </p>
                    <p className="text-7xl font-black">{roundNum}</p>
                </div>

                <div className={`${card} flex flex-col gap-3`}>
                    {roundData.pairs.map((pair, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
                        >
                            <span className="capitalize font-semibold">
                                {pair.revealer}
                            </span>
                            <span className="text-gray-500 text-sm">vs</span>
                            <span className="capitalize font-semibold">
                                {pair.questioner}
                            </span>
                        </div>
                    ))}
                    {roundData.sittingOut && (
                        <p className="text-gray-400 text-sm pt-1">
                            <span className="capitalize">
                                {roundData.sittingOut}
                            </span>{" "}
                            sits this round out
                        </p>
                    )}
                </div>

                <button
                    className={primaryBtn}
                    onClick={() => setPhase("pass-to-revealer")}
                >
                    Start Round
                </button>
            </div>
        );
    }

    // ── pass-to-revealer ─────────────────────────────────────────────────────
    if (phase === "pass-to-revealer" && currentPair) {
        return (
            <div className={screen}>
                <p className="text-gray-400 text-lg">Pass the phone to</p>
                <p className="text-5xl font-extrabold capitalize text-purple-400">
                    {currentPair.revealer}
                </p>
                <p className="text-gray-500 text-sm">
                    Don't let{" "}
                    <span className="capitalize">{currentPair.questioner}</span>{" "}
                    see!
                </p>
                <button
                    className={primaryBtn}
                    onClick={() => setPhase("pre-reveal")}
                >
                    I'm {currentPair.revealer}, ready
                </button>
            </div>
        );
    }

    // ── pre-reveal ───────────────────────────────────────────────────────────
    if (phase === "pre-reveal") {
        return (
            <div className={screen}>
                <p className="text-gray-400 text-lg text-center">
                    Your drink is hidden...
                </p>
                <button
                    className="w-56 h-36 rounded-2xl bg-gradient-to-br from-purple-800 to-purple-950 border-2 border-purple-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-purple-900/50"
                    onClick={() => setPhase("revealed")}
                >
                    <span className="text-6xl select-none">?</span>
                </button>
                <p className="text-gray-500 text-sm">Tap the card to reveal</p>
            </div>
        );
    }

    // ── revealed ─────────────────────────────────────────────────────────────
    if (phase === "revealed" && currentPair) {
        return (
            <div className={screen}>
                <p className="text-gray-400 text-lg">Your drink is...</p>
                <div className="w-full rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-px shadow-xl shadow-purple-900/40">
                    <div className="bg-gray-950 rounded-2xl px-6 py-8 text-center">
                        <p className="text-3xl font-bold capitalize">
                            {currentPair.drink}
                        </p>
                    </div>
                </div>
                <p className="text-gray-400 text-center text-sm leading-relaxed">
                    Now pass to{" "}
                    <span className="capitalize font-semibold text-white">
                        {currentPair.questioner}
                    </span>
                    <br />
                    <span className="text-red-400">— don't show them!</span>
                </p>
                <button
                    className={secondaryBtn}
                    onClick={() => setPhase("pass-to-questioner")}
                >
                    Done, passing phone
                </button>
            </div>
        );
    }

    // ── pass-to-questioner ───────────────────────────────────────────────────
    if (phase === "pass-to-questioner" && currentPair) {
        return (
            <div className={screen}>
                <p className="text-gray-400 text-lg">Pass the phone to</p>
                <p className="text-5xl font-extrabold capitalize text-orange-400">
                    {currentPair.questioner}
                </p>
                <button
                    className="w-full py-4 rounded-xl text-xl font-bold text-white cursor-pointer transition-transform active:scale-95 bg-orange-600 hover:bg-orange-500"
                    onClick={() => setPhase("questioning")}
                >
                    I'm {currentPair.questioner}, ready
                </button>
            </div>
        );
    }

    // ── questioning ──────────────────────────────────────────────────────────
    if (phase === "questioning" && currentPair) {
        return (
            <div className={screen}>
                <div className="text-center">
                    <p className="text-lg text-gray-300">
                        <span className="capitalize font-bold text-white">
                            {currentPair.revealer}
                        </span>{" "}
                        has a mystery drink!
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Ask yes or no questions, then decide:
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <button
                        className="w-full py-6 rounded-xl text-2xl font-black text-white cursor-pointer transition-transform active:scale-95 bg-green-600 hover:bg-green-500"
                        onClick={() => handleDecision(true)}
                    >
                        STEAL IT
                    </button>
                    <button
                        className="w-full py-6 rounded-xl text-2xl font-black text-white cursor-pointer transition-transform active:scale-95 bg-red-700 hover:bg-red-600"
                        onClick={() => handleDecision(false)}
                    >
                        LEAVE IT
                    </button>
                </div>
            </div>
        );
    }

    // ── pair-result ──────────────────────────────────────────────────────────
    if (phase === "pair-result" && lastResult) {
        const drinker = lastResult.stolen
            ? lastResult.questioner
            : lastResult.revealer;
        const continuer = lastResult.stolen
            ? lastResult.revealer
            : lastResult.questioner;
        const isLastPair = pairIndex + 1 >= roundData.pairs.length;

        return (
            <div className={screen}>
                <div className="text-center">
                    {lastResult.stolen ? (
                        <p className="text-2xl font-bold">
                            <span className="capitalize text-green-400">
                                {lastResult.questioner}
                            </span>{" "}
                            stole the drink!
                        </p>
                    ) : (
                        <p className="text-2xl font-bold">
                            <span className="capitalize text-orange-400">
                                {lastResult.revealer}
                            </span>{" "}
                            kept their drink!
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3 w-full">
                    <div className={card}>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                            Gets
                        </p>
                        <p className="text-2xl font-bold capitalize text-purple-300">
                            {lastResult.drink}
                        </p>
                        <p className="capitalize text-gray-300 mt-1">
                            {drinker}
                        </p>
                    </div>
                    <div className={card}>
                        <p className="capitalize font-semibold">{continuer}</p>
                        <p className="text-gray-400 text-sm mt-1">
                            advances to next round
                        </p>
                    </div>
                </div>

                <button
                    className={primaryBtn}
                    onClick={advanceFromPairResult}
                >
                    {isLastPair ? "End Round" : "Next Pair"}
                </button>
            </div>
        );
    }

    // ── round-summary ────────────────────────────────────────────────────────
    if (phase === "round-summary") {
        const drinkers = roundResults.map((r) => ({
            player: r.stolen ? r.questioner : r.revealer,
            drink: r.drink,
        }));
        const survivors = roundResults.map((r) =>
            r.stolen ? r.revealer : r.questioner,
        );
        if (roundData.sittingOut) survivors.push(roundData.sittingOut);

        return (
            <div className={screen}>
                <div className="text-center">
                    <p className="text-gray-400 text-sm uppercase tracking-widest">
                        Round {roundNum}
                    </p>
                    <p className="text-4xl font-black">Complete!</p>
                </div>

                <div className={`${card} flex flex-col gap-2`}>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                        Got their drink
                    </p>
                    {drinkers.map(({ player, drink }) => (
                        <div
                            key={player}
                            className="flex justify-between items-center py-1"
                        >
                            <span className="capitalize font-semibold">
                                {player}
                            </span>
                            <span className="capitalize text-purple-300">
                                {drink}
                            </span>
                        </div>
                    ))}
                </div>

                {survivors.length > 0 && (
                    <div className={`${card} flex flex-col gap-2`}>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                            Still in
                        </p>
                        {survivors.map((p) => (
                            <p key={p} className="capitalize font-semibold">
                                {p}
                            </p>
                        ))}
                    </div>
                )}

                <button className={primaryBtn} onClick={advanceRound}>
                    {survivors.length <= 1 ? "See Results" : "Next Round"}
                </button>
            </div>
        );
    }

    // ── sole-survivor ────────────────────────────────────────────────────────
    if (phase === "sole-survivor" && soloPlayer && soloDrink) {
        return (
            <div className={screen}>
                <div className="text-center">
                    <p className="text-gray-400 text-lg">Last one standing!</p>
                    <p className="text-5xl font-extrabold capitalize text-yellow-400 mt-2">
                        {soloPlayer}
                    </p>
                </div>
                <div className="w-full rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 p-px shadow-xl">
                    <div className="bg-gray-950 rounded-2xl px-6 py-8 text-center">
                        <p className="text-3xl font-bold capitalize">
                            {soloDrink}
                        </p>
                    </div>
                </div>
                <button
                    className={primaryBtn}
                    onClick={() => setPhase("game-over")}
                >
                    See Final Results
                </button>
            </div>
        );
    }

    // ── game-over ────────────────────────────────────────────────────────────
    if (phase === "game-over") {
        return (
            <div className={screen}>
                <div className="text-center">
                    <p className="text-5xl font-black">Game Over!</p>
                    <p className="text-gray-400 mt-2">Everyone has their fate</p>
                </div>

                <div className={`${card} flex flex-col gap-3`}>
                    {players.map((player) => (
                        <div
                            key={player}
                            className="flex justify-between items-center py-1 border-b border-white/10 last:border-0"
                        >
                            <span className="capitalize font-semibold">
                                {player}
                            </span>
                            <span className="capitalize text-purple-300">
                                {assignedDrinks[player] ?? "—"}
                            </span>
                        </div>
                    ))}
                </div>

                <button className={secondaryBtn} onClick={restartGame}>
                    Play Again
                </button>
            </div>
        );
    }

    return null;
}
