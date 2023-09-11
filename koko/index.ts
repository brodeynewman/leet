function minEatingSpeed(piles: number[], h: number): number {
    if (!piles.length) return 0;

    const highest = Math.max(...piles);

    let low = 1;
    let max = highest
    let lowest = 0;

    while (low <= max) {
        const mid = Math.floor((max + low) / 2);

        const hours = piles.reduce((acc, curr) => {
            return acc + Math.ceil(curr / mid)
        }, 0);

        if (hours <= h) {
            lowest = mid;
            max = mid - 1;
        } else {
            // mid is too high,
            low = mid + 1;
        }
    }

    return lowest;
};
