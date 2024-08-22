import { Scheduler } from './Scheduler.js';

export class FCFS extends Scheduler {
    schedule() {
        let currentTime = 0;

        while (this.queue.length > 0) {
            const process = this.queue.shift(); // FIFO order
            console.log(`FCFS: Ejecutando Proceso ${process.id} a tiempo ${currentTime}`);
            currentTime = currentTime + process.remainingTime;
            process.run(process.remainingTime);
            console.log(`FCFS: Proceso ${process.id} completado a tiempo ${currentTime}`);
        }
    }
}
