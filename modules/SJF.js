import { Scheduler } from './Scheduler.js';

export class SJF extends Scheduler {
    schedule() {
        this.queue.sort((a, b) => a.burstTime - b.burstTime);
        console.log("Ejecutando SJF...");
        this.queue.forEach(process => process.run());
    }
}
