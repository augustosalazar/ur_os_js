import { Scheduler } from './Scheduler.js';

export class FCFS extends Scheduler {
    schedule() {
        this.queue.sort((a, b) => a.arrivalTime - b.arrivalTime);
        console.log("Ejecutando FCFS...");
        this.queue.forEach(process => process.run());
    }
}
