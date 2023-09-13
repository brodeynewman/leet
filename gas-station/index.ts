function canCompleteCircuit(gas: number[], cost: number[]): number {
    let numTried = 0;
    let previousGasStart;

    while (numTried < gas.length) {
        let starting;
        
        // find a starting point
        for (let i = numTried; i < gas.length; i++) {
            const curr = gas[i];
            const currCost = cost[i];

            if (curr - currCost >= 0) {
                starting = i;
                break;
            };
        }

        // can't find a starting location.
        if (starting == null) return -1;

        // optimization
        if (gas[starting] === previousGasStart) {
            numTried++;
            continue;
        }

        let exit = false;
        let numRoutes = gas.length;
        let currStation = starting;
        let currTank = gas[starting];

        while (numRoutes >= 0 && !exit) {
            const currCost = cost[currStation];

            if (currTank - currCost >= 0) {
                // figure out next location;
                if (gas[currStation + 1] != null) {
                    currStation++;
                } else {
                    currStation = 0;
                }

                // subtract our gas, and our next station's gas
                currTank = (currTank - currCost) + gas[currStation];
            } else {
                numTried++;
                previousGasStart = starting;
                exit = true;
            }

            numRoutes--;
        }

        if (!exit) {
            return starting;
        }
    }

    return -1;
};
