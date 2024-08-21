export class ProcessBurstList {
    constructor() {
        this.bursts = [];
    }

    addBurst(burst) {
        this.bursts.push(burst);
    }

    getNextBurst() {
        return this.bursts.shift();
    }

    isEmpty() {
        return this.bursts.length === 0;
    }
}
