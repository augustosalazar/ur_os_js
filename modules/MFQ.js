import { Scheduler } from './Scheduler.js';

export class MFQ extends Scheduler {
    constructor(levels) {
        super();
        this.levels = levels; // Number of levels in the queue
        this.queues = Array.from({ length: levels }, () => []);
    }

    addProcess(process) {
        this.queues[0].push(process); // All processes start in the highest priority queue
        console.log(`Proceso ${process.id} añadido a la cola de prioridad 0`);
    }

    schedule() {
        let currentTime = 0;

        for (let level = 0; level < this.levels; level++) {
            while (this.queues[level].length > 0) {
                const process = this.queues[level].shift();
                currentTime = Math.max(currentTime, process.arrivalTime);
                console.log(`MFQ: Ejecutando Proceso ${process.id} en la cola de prioridad ${level} a tiempo ${currentTime}`);
                process.run(currentTime, 2 ** level); // Quantum increases as priority decreases
                if (process.getRemainingTime() > 0) {
                    if (level < this.levels - 1) {
                        this.queues[level + 1].push(process);
                        console.log(`Proceso ${process.id} movido a la cola de prioridad ${level + 1}`);
                    } else {
                        this.queues[level].push(process); // Stay in the lowest priority queue
                    }
                }
                currentTime = process.finishTime;
                console.log(`MFQ: Proceso ${process.id} completado o reprogramado a tiempo ${currentTime}`);
            }
        }
    }
}
