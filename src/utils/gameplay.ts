export interface PairData {
    revealer: string;
    questioner: string;
    drink: string;
}

export interface RoundData {
    pairs: PairData[];
    sittingOut: string | null;
}

export function shuffleArray<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function buildRound(players: string[], drinkPool: string[]): RoundData {
    const shuffledPlayers = shuffleArray(players);
    const sittingOut =
        shuffledPlayers.length % 2 !== 0 ? shuffledPlayers.pop()! : null;
    const shuffledDrinks = shuffleArray(drinkPool);

    const pairs: PairData[] = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
        const [p1, p2] = [shuffledPlayers[i], shuffledPlayers[i + 1]];
        const [revealer, questioner] =
            Math.random() < 0.5 ? [p1, p2] : [p2, p1];
        pairs.push({
            revealer,
            questioner,
            drink: shuffledDrinks[Math.floor(i / 2)] ?? "mystery drink",
        });
    }

    return { pairs, sittingOut };
}

export function pickRandomDrink(pool: string[]): string {
    return pool[Math.floor(Math.random() * pool.length)] ?? "mystery drink";
}
