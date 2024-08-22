import { Scheduler } from './Scheduler.js';

export class RoundRobin extends Scheduler {
    constructor(quantum) {
        super();
        this.quantum = quantum; // Set the quantum time slice for the scheduler
    }

    schedule() {
        let currentTime = 0;
        while (this.queue.length > 0) {
            const process = this.queue.shift(); // Remove the first process in the queue
            console.log(`Ejecutando Proceso ${process.id} a tiempo ${currentTime}`); // Log the current execution
            process.run(this.quantum); // Run the process with the specified quantum
            if (process.getRemainingTime() > 0) {
                this.queue.push(process); // Re-add process to the queue if it’s not finished
                console.log(`Proceso ${process.id} no completado, se reprograma`); // Log that the process is requeued
            }
            currentTime += this.quantum; // Advance the current time by the quantum
        }
    }
}
