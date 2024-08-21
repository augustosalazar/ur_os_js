import { Scheduler } from './Scheduler.js';

export class RoundRobin extends Scheduler {
    constructor(quantum) {
        super();
        this.quantum = quantum;
    }

    schedule() {
        console.log("Ejecutando Round Robin...");
        while (this.queue.length > 0) {
            let process = this.queue.shift();
            process.run(this.quantum);
            if (process.burstTime > this.quantum) {
                process.burstTime -= this.quantum;
                this.queue.push(process);
            }
        }
    }
}
