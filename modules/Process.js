export class Process {
    constructor(id, burstTime) {
        this.id = id;
        this.burstTime = burstTime;
    }

    run() {
        console.log(`Process ${this.id} is running with burst time ${this.burstTime}`);
    }
}
