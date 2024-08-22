import { Scheduler } from './Scheduler.js';

export class SJF extends Scheduler {
    schedule() {
        let currentTime = 0;

        // Sort by burst time (Shortest Job First)
        this.queue.sort((a, b) => a.burstTime - b.burstTime);
        console.log('SJF: Orden de ejecución según burst time:', this.queue.map(p => `Proceso ${p.id}: ${p.burstTime}`));

        while (this.queue.length > 0) {
            const process = this.queue.shift();
            currentTime = Math.max(currentTime, process.arrivalTime);
            console.log(`SJF: Ejecutando Proceso ${process.id} a tiempo ${currentTime}`);
            process.run(currentTime);
            currentTime = process.finishTime;
            console.log(`SJF: Proceso ${process.id} completado a tiempo ${currentTime}`);
        }
    }
}
