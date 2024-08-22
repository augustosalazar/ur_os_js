import { Scheduler } from './Scheduler.js';

export class RoundRobin extends Scheduler {
    constructor(quantum) {
        super();
        this.quantum = quantum;
    }

    schedule() {
        let currentTime = 0;

        console.log(`Round Robin: Quantum = ${this.quantum}`);
        while (this.queue.length > 0) {
            const process = this.queue.shift();
            currentTime = Math.max(currentTime, process.arrivalTime);
            console.log(`Round Robin: Ejecutando Proceso ${process.id} con tiempo restante ${process.remainingTime} a tiempo ${currentTime}`);
            process.run(currentTime, this.quantum);

            if (process.state !== 'TERMINATED') {
                this.queue.push(process);
                console.log(`Round Robin: Proceso ${process.id} no completado, se reprograma`);
                currentTime += this.quantum;
            } else {
                currentTime = process.finishTime;
                console.log(`Round Robin: Proceso ${process.id} completado a tiempo ${currentTime}`);
            }
        }
    }
}
